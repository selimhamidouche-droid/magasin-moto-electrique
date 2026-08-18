// Supabase Edge Function — create-checkout-session
// Deploy: npx supabase functions deploy create-checkout-session
// Set secret: npx supabase secrets set STRIPE_SECRET_KEY=sk_test_...

import Stripe from 'https://esm.sh/stripe@14?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  try {
    const { items, successUrl, cancelUrl } = await req.json();

    const line_items = items.map((item: { product: { nom: string; prix: number; image_url?: string }; quantity: number }) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.nom,
          images: item.product.image_url ? [item.product.image_url] : [],
        },
        unit_amount: Math.round(item.product.prix * 100), // centimes
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: 'fr',
      shipping_address_collection: { allowed_countries: ['FR', 'BE', 'CH', 'LU'] },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});

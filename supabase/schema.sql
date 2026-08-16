-- Active l'extension UUID si nécessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des motos / produits
CREATE TABLE IF NOT EXISTS public.motos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    categorie TEXT NOT NULL, -- ex: 'Light Bee', 'Ultra Bee', 'Storm Bee'
    prix NUMERIC(10, 2) NOT NULL,
    vitesse_max INT, -- km/h
    autonomie INT, -- km
    puissance_kw NUMERIC(5, 2),
    permis_requis TEXT, -- ex: 'BSR / AM', 'A1', 'Sans permis'
    image_url TEXT,
    description TEXT,
    en_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des demandes de contact / devis
CREATE TABLE IF NOT EXISTS public.demandes_contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    message TEXT NOT NULL,
    moto_id UUID REFERENCES public.motos(id) ON DELETE SET NULL,
    statut TEXT DEFAULT 'nouveau', -- 'nouveau', 'en_cours', 'traite'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des commandes / réservations
CREATE TABLE IF NOT EXISTS public.commandes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_nom TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_telephone TEXT NOT NULL,
    client_adresse TEXT,
    moto_id UUID REFERENCES public.motos(id) ON DELETE RESTRICT,
    montant_total NUMERIC(10, 2) NOT NULL,
    statut TEXT DEFAULT 'en_attente', -- 'en_attente', 'confirmee', 'livree', 'annulee'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activer Row Level Security (RLS)
ALTER TABLE public.motos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demandes_contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commandes ENABLE ROW LEVEL SECURITY;

-- Politiques RLS : Lecture publique des motos
CREATE POLICY "Lecture publique des motos" 
ON public.motos FOR SELECT 
USING (true);

-- Politiques RLS : Insertion publique des demandes de contact
CREATE POLICY "Insertion publique demandes de contact" 
ON public.demandes_contact FOR INSERT 
WITH CHECK (true);

-- Politiques RLS : Insertion publique des commandes
CREATE POLICY "Insertion publique commandes" 
ON public.commandes FOR INSERT 
WITH CHECK (true);

-- Insertion de données de démonstration pour les motos
INSERT INTO public.motos (nom, categorie, prix, vitesse_max, autonomie, puissance_kw, permis_requis, description)
VALUES 
('Sur-Ron Light Bee X', 'Light Bee', 4690.00, 75, 100, 6.0, 'BSR / AM (Dès 14 ans)', 'Légère, agile et ultra-performante sur tous les terrains.'),
('Sur-Ron Ultra Bee', 'Ultra Bee', 7990.00, 90, 140, 12.5, 'Permis A1 / B', 'Le compromis parfait entre puissance tout-terrain et polyvalence.'),
('Sur-Ron Storm Bee', 'Storm Bee', 10990.00, 110, 120, 22.5, 'Permis A2 / A', 'Puissance brute enduro pour les pilotes les plus exigeants.');

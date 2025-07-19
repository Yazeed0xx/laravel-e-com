import FutreProd from '@/Components/FutreProd';
import Hero from '@/Components/Hero';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const auth = usePage().props.auth;

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full sm:px-6 lg:px-8">
                    <Hero />
                </div>

                <div>
                    <FutreProd />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import { AlertTriangle, CheckCircle, ShoppingCart, X } from 'lucide-react';
import { Button } from './button';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
    if (!isVisible) return null;

    const config = {
        success: {
            icon: <CheckCircle className="h-5 w-5" />,
            bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
            textColor: 'text-white',
            borderColor: 'border-green-400',
        },
        error: {
            icon: <AlertTriangle className="h-5 w-5" />,
            bgColor: 'bg-gradient-to-r from-red-500 to-rose-600',
            textColor: 'text-white',
            borderColor: 'border-red-400',
        },
        info: {
            icon: <ShoppingCart className="h-5 w-5" />,
            bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
            textColor: 'text-white',
            borderColor: 'border-blue-400',
        },
    };

    const currentConfig = config[type];

    return (
        <div className="animate-in slide-in-from-top-4 fixed right-6 top-6 z-50 duration-300">
            <div
                className={` ${currentConfig.bgColor} ${currentConfig.textColor} ${currentConfig.borderColor} min-w-[300px] max-w-md rounded-lg border-l-4 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
            >
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">{currentConfig.icon}</div>
                    <div className="flex-1">
                        <p className="text-sm font-medium leading-relaxed">
                            {message}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-6 w-6 p-0 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

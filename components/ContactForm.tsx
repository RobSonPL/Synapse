import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';
import { TrashIcon, CartIcon, CheckIcon } from './Icons';

interface ContactFormProps {
  cart: ServiceItem[];
  removeFromCart: (item: ServiceItem) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ cart, removeFromCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Prepare the message with cart details
    const cartSummary = cart.length > 0 
        ? `\n\n=== WYBRANE USŁUGI ===\n${cart.map(item => `• ${item.name} (${item.price})`).join('\n')}\n======================`
        : '';

    const fullMessage = `${formData.message}\n${cartSummary}`;

    try {
        const response = await fetch("https://formsubmit.co/ajax/turobert@icloud.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: fullMessage,
                _subject: `Nowe zapytanie: ${formData.name}`,
                _template: "table", // Makes the email look nicer
                _captcha: "false"   // Disables captcha for smoother UX
            })
        });

        if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus('error');
        }
    } catch (error) {
        console.error("Form error:", error);
        setStatus('error');
    }
  };

  if (status === 'success') {
      return (
        <section id="contact-form" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <FadeIn>
                    <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-800">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-500/30">
                            <CheckIcon />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Wiadomość Wysłana!</h2>
                        <p className="text-slate-600 dark:text-gray-300 text-lg mb-8">
                            Dziękuję za kontakt. Twoje zapytanie (wraz z wybranymi usługami) trafiło do mojej skrzynki. Odpiszę najszybciej jak to możliwe.
                        </p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="text-synapse-primary font-bold hover:underline"
                        >
                            Wyślij kolejną wiadomość
                        </button>
                    </div>
                </FadeIn>
            </div>
        </section>
      );
  }

  return (
    <section id="contact-form" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Form Section */}
          <div className="w-full lg:w-3/5">
             <FadeIn>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Napisz do mnie</h2>
                <p className="text-slate-600 dark:text-gray-400 mb-8">
                    Masz pytania? Wypełnij formularz. Odpowiedź otrzymasz bezpośrednio na swój email.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Imię i Nazwisko</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            value={formData.name}
                            onChange={handleChange}
                            disabled={status === 'submitting'}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                            placeholder="Jan Kowalski"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={status === 'submitting'}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                            placeholder="jan@przyklad.pl"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Wiadomość</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows={4}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            disabled={status === 'submitting'}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                            placeholder="Opisz swój projekt..."
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold text-lg shadow-lg hover:shadow-synapse-primary/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Wysyłanie...
                            </>
                        ) : (
                            'Wyślij Wiadomość'
                        )}
                    </button>
                    
                    {status === 'error' && (
                        <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                            Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub napisz bezpośrednio na <a href="mailto:turobert@icloud.com" className="underline font-bold">turobert@icloud.com</a>.
                        </p>
                    )}
                </form>
             </FadeIn>
          </div>

          {/* Mini Cart / Summary Section */}
          <div className="w-full lg:w-2/5">
             <FadeIn delay={200} className="h-full">
                <div className="h-full bg-slate-50 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CartIcon />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="bg-synapse-primary/20 text-synapse-primary p-2 rounded-lg"><CartIcon /></span>
                        Twój Wybór
                    </h3>

                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-slate-500 dark:text-gray-400">
                            <p className="mb-2">Koszyk usług jest pusty.</p>
                            <p className="text-sm">Dodaj usługi z sekcji powyżej, aby otrzymać precyzyjną wycenę.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <ul className="space-y-3">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex justify-between items-center bg-white dark:bg-black/20 p-3 rounded-lg border border-slate-200 dark:border-white/5 group">
                                        <div className="flex-1 pr-4">
                                            <span className="block text-sm font-semibold text-slate-800 dark:text-gray-200">{item.name}</span>
                                            <span className="text-xs text-synapse-primary">{item.price}</span>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10"
                                            title="Usuń z koszyka"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
                                <p className="text-xs text-slate-500 dark:text-gray-500 text-center">
                                    Powyższe ceny są orientacyjne. Ostateczną wycenę przygotuję po zapoznaniu się ze szczegółami projektu.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
             </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};
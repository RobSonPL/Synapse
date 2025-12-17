import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';
import { TrashIcon, CartIcon } from './Icons';
import { config } from '../data/config';

interface ContactFormProps {
  cart: ServiceItem[];
  removeFromCart: (item: ServiceItem) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ cart, removeFromCart }) => {
  // We only need state for visual feedback in inputs, 
  // but the submission will be handled natively by the browser
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Prepare cart summary string for the hidden input
  const cartSummary = cart.length > 0 
    ? cart.map(item => `- ${item.name} (${item.price})`).join('\n')
    : 'Brak wybranych dodatkowych usług.';

  return (
    <section id="contact-form" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Form Section */}
          <div className="w-full lg:w-3/5">
             <FadeIn>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Napisz do mnie</h2>
                <p className="text-slate-600 dark:text-gray-400 mb-8">
                    Wypełnij formularz poniżej. Zostaniesz przekierowany do bezpiecznej bramki wysyłkowej, aby potwierdzić wiadomość.
                </p>
                
                {/* 
                    STANDARD HTML FORM SUBMISSION 
                    target="_blank" ensures that if there is an error (like running from local file), 
                    it opens in a new tab and doesn't disrupt the user's session.
                */}
                <form 
                    action={`https://formsubmit.co/${config.contactEmail}`}
                    method="POST" 
                    target="_blank"
                    className="space-y-6"
                    encType="multipart/form-data"
                >
                    {/* --- CONFIGURATION FIELDS FOR FORMSUBMIT --- */}
                    {/* Disable Captcha if you want cleaner UX, keep true if you get spam */}
                    <input type="hidden" name="_captcha" value="false" />
                    {/* Subject of the email you receive */}
                    <input type="hidden" name="_subject" value={`Nowe zapytanie ze strony: ${formData.name}`} />
                    {/* Make the email look nice */}
                    <input type="hidden" name="_template" value="table" />
                    {/* Hidden field containing the cart items */}
                    <input type="hidden" name="Wybrane_Usługi" value={cartSummary} />
                    
                    {/* Optional: Redirect back to your site after success */}
                    {/* <input type="hidden" name="_next" value="https://synapsehub.pl/thanks.html" /> */}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Imię i Nazwisko</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary focus:border-transparent outline-none transition-all"
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
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary focus:border-transparent outline-none transition-all"
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
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary focus:border-transparent outline-none transition-all"
                            placeholder="Opisz swój projekt..."
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold text-lg shadow-lg hover:shadow-synapse-primary/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        Wyślij Wiadomość
                    </button>
                    
                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 mt-6 flex flex-col items-center">
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-3">
                            Potrzebujesz szybszej odpowiedzi?
                        </p>
                        <a 
                            href={config.socials.whatsapp} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/10 text-[#25D366] font-bold hover:bg-[#25D366]/20 transition-all duration-200 border border-[#25D366]/20"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-5 h-5">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            Napisz na WhatsApp
                        </a>
                    </div>
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
                                            type="button" // Important so it doesn't submit form
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
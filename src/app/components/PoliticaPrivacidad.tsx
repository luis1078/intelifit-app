import { ArrowLeft } from 'lucide-react';
import { Language } from '../translations';

interface PoliticaPrivacidadProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

const sections = [
  {
    title: 'Información que recopilamos',
    body: 'Recopilamos información que usted nos proporciona directamente, como nombre, correo electrónico, datos de salud y condición física, historial de clases y pagos realizados. También recopilamos datos de uso de la aplicación para mejorar nuestros servicios.',
  },
  {
    title: 'Cómo usamos tu información',
    body: 'Utilizamos su información para gestionar su cuenta, personalizar su experiencia de entrenamiento, enviar recordatorios de clases, procesar pagos y mejorar continuamente nuestros servicios. No vendemos su información personal a terceros.',
  },
  {
    title: 'Tus derechos',
    body: 'Usted tiene derecho a acceder, corregir o eliminar su información personal en cualquier momento. Puede solicitar una copia de sus datos o la eliminación de su cuenta contactándonos a través de los canales de soporte indicados en esta aplicación.',
  },
  {
    title: 'Seguridad de los datos',
    body: 'Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra accesos no autorizados, pérdida o divulgación. Todos los pagos se procesan con cifrado SSL.',
  },
  {
    title: 'Contacto',
    body: 'Para cualquier consulta relacionada con esta política, puede contactarnos en privacidad@steffanysolano.com o a través de la sección de Ayuda y Soporte dentro de la aplicación.',
  },
];

export default function PoliticaPrivacidad({ language, navigate }: PoliticaPrivacidadProps) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <button onClick={() => navigate('profile')}>
          <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
        </button>
        <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>
          {language === 'es' ? 'Política de privacidad' : 'Privacy policy'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        <p className="text-[12px]" style={{ color: '#767676' }}>
          {language === 'es' ? 'Última actualización: enero 2026' : 'Last updated: January 2026'}
        </p>

        {sections.map(({ title, body }) => (
          <div key={title} className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
            <p className="text-[15px] font-semibold mb-2" style={{ color: '#1A1A1A' }}>{title}</p>
            <p className="text-[14px]" style={{ color: '#3D3D3D', lineHeight: 1.7 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

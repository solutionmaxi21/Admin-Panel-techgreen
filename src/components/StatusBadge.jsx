import React from 'react';
import { useTranslation } from 'react-i18next';

const StatusBadge = ({ status, type = 'default', label: labelProp }) => {
  const { t, i18n } = useTranslation();
  const normalizedStatus = status?.toString().toLowerCase() || 'unknown';

  const getColor = () => {
    // Green (Good)
    if (['active', 'published', 'instock', 'in stock', 'delivered', 'completed', 'approved', 'verified'].includes(normalizedStatus)) return 'green';

    // Blue (Processing/Info)
    if (['processing', 'shipped'].includes(normalizedStatus)) return 'blue';

    // Orange (Return flow)
    if (['returning', 'returned', 'unverified'].includes(normalizedStatus)) return 'orange';

    // Yellow (Warning)
    if (normalizedStatus.includes('low') || ['pending', 'awaiting_confirmation'].includes(normalizedStatus)) return 'yellow';

    // Red (Bad)
    if (['inactive', 'draft', 'archived', 'outofstock', 'out of stock', 'cancelled', 'rejected'].includes(normalizedStatus)) return 'red';

    // Gray (Default)
    return 'gray';
  };

  const color = getColor();

  // Teintes alignees sur la marque : le bleu etait hsl(221 ...) — le bleu
  // Tailwind, pas celui du site — et l'orange etait hsl(33 ...), un ambre,
  // alors que la marque est un orange rouge a teinte 12. Le vert, le jaune, le
  // rouge et le gris sont semantiques et inchanges.
  //
  // Volontairement laisse en litteraux plutot qu'en var(--primary-*) : ces
  // entrees vert/jaune/rouge/gris n'ont pas d'equivalent qui bascule en mode
  // sombre, donc tokeniser seulement le bleu et l'orange produirait des
  // pastilles sombres a cote de pastilles claires dans la meme liste. Le mode
  // sombre de ces pastilles reste un chantier a part.
  const styles = {
    green: { backgroundColor: 'hsl(142 76% 96%)', color: 'hsl(142 76% 36%)', border: '1px solid hsl(142 76% 80%)' },
    blue: { backgroundColor: 'hsl(216 95% 94%)', color: 'hsl(216 95% 32%)', border: '1px solid hsl(216 88% 84%)' },
    yellow: { backgroundColor: 'hsl(48 96% 89%)', color: 'hsl(32 95% 44%)', border: '1px solid hsl(48 96% 75%)' },
    orange: { backgroundColor: 'hsl(12 100% 96%)', color: 'hsl(12 88% 34%)', border: '1px solid hsl(12 100% 82%)' },
    purple: { backgroundColor: 'hsl(262 83% 96%)', color: 'hsl(262 83% 58%)', border: '1px solid hsl(262 83% 85%)' },
    red: { backgroundColor: 'hsl(0 84% 96%)', color: 'hsl(0 84% 60%)', border: '1px solid hsl(0 84% 85%)' },
    gray: { backgroundColor: 'hsl(220 14% 96%)', color: 'hsl(220 12% 40%)', border: '1px solid hsl(220 16% 90%)' },
  };

  const currentStyle = styles[color];

  const statusKey = `status.${normalizedStatus}`;
  const label = labelProp ?? (i18n.exists(statusKey)
    ? t(statusKey)
    : status);

  return (
    <span style={{
      ...currentStyle,
      padding: '2px 8px',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'capitalize',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      lineHeight: 1.2,
      whiteSpace: 'nowrap'
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: currentStyle.color }}></span>
      {label}
    </span>
  );
};

export default StatusBadge;
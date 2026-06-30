CONTEXT — PROTOTYPE V2
This is version 2 of a mobile fitness coaching app for Steffany Solano, a personal trainer. 
Frame size: 390x844px (iPhone 14). Grid: 4 columns, 16px gutters. Auto Layout on all components. 
The app already has screens built in V1. This prompt defines all changes and new flows for V2.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 1 — UPDATED COLOR PALETTE
Replace the current green-only palette with this refined system. Apply globally to all screens.

Primary:        #1A6B4A  (deep forest green — CTAs, active states, selected pills)
Primary light:  #E8F5EE  (green tint — card backgrounds, highlights)
Primary dark:   #0D3D2A  (dark green — pressed states, header text on light)

Accent:         #F0A500  (warm amber — progress indicators, achievement badges, stars)
Accent light:   #FEF3D0  (amber tint — notification backgrounds)

Neutral 900:    #1A1A1A  (headings)
Neutral 700:    #3D3D3D  (body text)
Neutral 500:    #767676  (secondary text, labels)
Neutral 300:    #C4C4C4  (borders, dividers)
Neutral 100:    #F5F5F5  (page background)
White:          #FFFFFF  (card surfaces)

Semantic success:  #2E7D32
Semantic warning:  #F9A825
Semantic error:    #C62828

Apply the amber accent (#F0A500) to: progress percentage on dashboard, star ratings in testimonials, achievement indicators.
Apply primary green only to: CTA buttons, selected states, active nav icon, booking confirmation elements.
All buttons: border-radius 12px. All cards: border-radius 16px. Inputs: border-radius 10px.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 2 — BUTTON INTERACTIONS & NAVIGATION CONNECTIONS
Connect all buttons with proper prototype interactions between frames.

LANDING PAGE:
- "Comenzar ahora" button → navigate to REGISTRO Step 1 screen (slide left transition, 300ms ease)
- "Iniciar sesión" link in navbar → navigate to LOGIN screen (slide left)
- Service cards (Evaluación Integral, Clases Grupales, etc.) → navigate to respective detail modals or stay on landing with scroll anchor

REGISTRO (3-step flow):
- Step 1 "Continuar" button → navigate to Registro Step 2 (slide left)
- Step 2 "Continuar" button → navigate to Registro Step 3 (slide left)
- Step 3 "Elegir plan" / "Confirmar" button → navigate to PAYMENT screen (slide left)
- Back arrow on each step → navigate to previous step (slide right)
- Progress bar segments must reflect current step (segment 1 active on step 1, etc.)

LOGIN screen:
- "Iniciar sesión" button → navigate to DASHBOARD (slide left)
- "¿Olvidaste tu contraseña?" → navigate to password recovery screen or show modal
- "Crear cuenta" link → navigate to Registro Step 1

DASHBOARD:
- "Mi Progreso" quick access card → navigate to MI PROGRESO screen (slide left)
- "Mis Rutinas" quick access card → navigate to MIS RUTINAS screen (slide left)
- "Reservar Clase" quick access card → navigate to RESERVAR CLASE screen (slide left)
- "Agente IA" quick access card → navigate to AGENTE IA chat screen (slide left)
- Bottom nav "Inicio" → Dashboard
- Bottom nav "Progreso" → Mi Progreso
- Bottom nav "Reservas" → Reservar Clase
- Bottom nav "Agente" → Agente IA
- Bottom nav "Perfil" → Mi Perfil
- Próxima clase card → navigate to Reservar Clase screen

MI PROGRESO:
- Period selector 1M / 3M / 6M → toggle active state within same screen (no navigation, just update selected pill style)
- "Ver reporte completo" button → navigate to REPORTE COMPLETO screen or expand modal overlay
- Back arrow → Dashboard

RESERVAR CLASE:
- Filter pills (Box / Pilates / Aeróbicos) → toggle active state, filter visible class cards
- Calendar day tabs → toggle selected day highlight
- Each class card "Reservar" button → show BOOKING CONFIRMATION MODAL (overlay, dissolve transition)
- Back arrow → Dashboard

AGENTE IA:
- Send button / quick suggestion chips → show next message bubble in chat (dissolve)
- Back arrow → Dashboard

MI PERFIL:
- "Editar perfil" → navigate to edit profile screen or show input fields as editable
- "Cerrar sesión" → navigate to Landing page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 3 — BOOKING CONFIRMATION MODAL
Add this modal as an overlay on top of the RESERVAR CLASE screen.
Trigger: user taps any "Reservar" button on a class card.
Transition: dissolve / fade-in, 250ms.

Modal design specs:
- Overlay background: rgba(0, 0, 0, 0.50) covering full screen
- Modal card: white, border-radius 24px, padding 32px 24px, centered vertically and horizontally
- Width: 340px max

Modal content (top to bottom):
1. Success icon: circle 64px diameter, fill #E8F5EE, icon checkmark inside in #1A6B4A, stroke 2.5px
2. Headline: "¡Clase reservada!" — font 22px, weight 600, color #1A1A1A, center aligned
3. Class detail block (card inside modal, background #F5F5F5, border-radius 12px, padding 16px):
   - Class name (e.g. "Entrenamiento Box") — 16px, weight 500, #1A1A1A
   - Date and time (e.g. "Miércoles 27 · 6:00 AM") — 14px, #767676
   - Instructor: "Steffany Solano" — 14px, #767676
4. Subtext: "Recibirás una notificación 30 minutos antes de tu clase." — 13px, #767676, center aligned
5. Primary button: "Ver mis reservas" — full width, height 52px, background #1A6B4A, text white, border-radius 12px
6. Secondary text button: "Volver al inicio" — 14px, color #1A6B4A, no border, center aligned

Interaction on modal:
- "Ver mis reservas" → navigate to MIS RESERVAS screen (slide left), dismiss modal
- "Volver al inicio" → dismiss modal, return to RESERVAR CLASE screen
- Tap on dark overlay → dismiss modal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 4 — PAYMENT SCREEN (new screen)
Create a new PAGO screen triggered after Step 3 of Registro when user selects a plan.

Screen header:
- Back arrow (left) → navigate back to Registro Step 3
- Title "Método de pago" — 20px, weight 500, centered
- Subtitle "Pago seguro con cifrado SSL" with a small lock icon — 12px, #767676

Plan summary card (top of screen, background #E8F5EE, border-radius 16px, padding 16px):
- Label "Plan seleccionado" — 12px, #767676, uppercase
- Plan name (e.g. "Evaluación Integral") — 18px, weight 600, #1A6B4A
- Price — 28px, weight 700, #1A1A1A  (e.g. "S/ 299 / mes")
- Small text "Cancela cuando quieras" — 12px, #767676

Payment method selector (segmented control or tab row, 2 options):
- "Tarjeta" tab (active by default) — icon credit-card
- "Yape / Plin" tab — icon phone or QR code

CARD PAYMENT form (shown when "Tarjeta" is active):
- Input: Número de tarjeta — placeholder "1234 5678 9012 3456", with card brand icon on right
- Row with 2 inputs side by side:
  - Vencimiento — placeholder "MM/AA"
  - CVV — placeholder "123" with eye-toggle icon
- Input: Nombre en la tarjeta — placeholder "Como aparece en la tarjeta"
- Checkbox row: "Guardar tarjeta para futuros pagos" — 13px, #3D3D3D
- Accepted cards row: show Visa, Mastercard, Amex icons (small, 32px height, grayscale)

YAPE / PLIN panel (shown when that tab is active):
- QR code placeholder block — 200x200px, border #C4C4C4, border-radius 12px, centered
- Instruction text: "Escanea con tu app Yape o Plin" — 14px, #767676, centered
- Amount to transfer: "S/ 299.00" — 24px, weight 600, #1A1A1A, centered
- Small text: "El QR expira en 10:00 minutos" with countdown style

Bottom sticky area (fixed at bottom, white background, padding 16px 24px):
- Total row: "Total a pagar" left + "S/ 299.00" right — both 16px, total amount weight 600
- Divider line
- CTA button: "Confirmar pago" — full width, height 56px, background #1A6B4A, text white 16px weight 500, border-radius 12px
- Microcopy below button: "Al confirmar aceptas nuestros Términos y condiciones" — 11px, #767676, centered, "Términos y condiciones" underlined in #1A6B4A

PAYMENT SUCCESS screen (navigate to after "Confirmar pago"):
- Full screen, white background
- Large success animation placeholder (circle 96px, #E8F5EE fill, checkmark #1A6B4A)
- Headline: "¡Bienvenida, [Nombre]!" — 26px, weight 600, #1A1A1A, centered
- Subtext: "Tu plan Evaluación Integral está activo. Steffany ya fue notificada y se pondrá en contacto contigo." — 15px, #767676, centered, max-width 300px
- Primary button: "Ir al inicio" — full width, #1A6B4A, height 52px, border-radius 12px → navigate to DASHBOARD
- Secondary link: "Ver detalles del plan" — 14px, #1A6B4A, centered

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 5 — GLOBAL IMPROVEMENTS TO APPLY ON ALL SCREENS

Typography refinement:
- Page titles: 22px, weight 600, #1A1A1A
- Section labels: 11px, weight 500, #767676, letter-spacing 0.8px, uppercase
- Body text: 15px, weight 400, #3D3D3D, line-height 1.6
- Button text: 15px, weight 500
- Microcopy / captions: 12px, #767676

Bottom navigation bar (apply to ALL module screens, not just dashboard):
- Height: 80px including safe area
- Background: white, border-top 0.5px #C4C4C4
- 5 items: Inicio / Progreso / Reservas / Agente / Perfil
- Active icon + label: #1A6B4A
- Inactive: #767676
- Label font: 10px

Cards global style:
- Background: #FFFFFF
- Border: 0.5px solid #C4C4C4
- Border-radius: 16px
- Padding: 16px
- No drop shadows

Input fields global style:
- Height: 52px
- Border: 1px solid #C4C4C4
- Border-radius: 10px
- Focus border: 1.5px solid #1A6B4A
- Background: #FFFFFF
- Placeholder color: #767676
- Label above input: 13px, #3D3D3D, weight 500

Buttons global style:
- Primary: background #1A6B4A, text white, height 52px, border-radius 12px, full width
- Secondary: background white, border 1.5px solid #1A6B4A, text #1A6B4A, same size
- Disabled state: background #C4C4C4, text #F5F5F5, not interactive
- Destructive: background #C62828, text white

Progress bar in Registro:
- Track: #C4C4C4, height 4px, border-radius 2px
- Active segment: #1A6B4A
- 3 segments with 4px gap between them

Rename "Volumen Corporal" to "Contorno corporal (cm)" on Mi Progreso chart.
Add Y-axis unit labels to the progress chart (kg on left axis, cm on right axis if dual axis, or keep single and label clearly).
Add tooltip on chart point tap: small popover showing exact value + month label.
CONTEXT — PROTOTYPE V2.2 / BUG FIXES ROUND 2
Mobile fitness coaching app for Steffany Solano. Frame 390x844px. Fixing remaining dead 
buttons and content issues found in this round of review.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. RESERVAR CLASE — FIX "RESERVAR" BUTTON (CONFIRMATION MODAL NOT TRIGGERING)
Every "Reservar" button on every class card must open the booking confirmation modal as an 
overlay. This connection appears broken or missing — verify and fix on ALL class cards, not 
just one example card.

Modal spec (in case it needs rebuilding):
- Overlay: rgba(0,0,0,0.5) full screen, tap outside dismisses
- White card, border-radius 24px, padding 32px 24px, centered
- Success icon: circle 64px, fill #E8F5EE, checkmark #1A6B4A
- Headline: "¡Clase reservada!" 22px weight 600
- Detail card (bg #F5F5F5, border-radius 12px, padding 16px): class name, day + time, instructor
- Subtext: "Recibirás una notificación 30 minutos antes de tu clase."
- Primary button: "Ver mis reservas" → navigate to MIS RESERVAS
- Secondary link: "Volver al inicio" → dismiss modal only, stay on Reservar Clase
Test this on at least 3 different class cards to confirm the interaction is applied consistently, 
not just on one instance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. ADD PERMANENT ACCESS TO "MIS RESERVAS"
Currently Mis Reservas is only reachable through the booking confirmation modal. Add two 
persistent entry points:

a) Bottom navigation bar: confirm "Reservas" tab in the 5-icon bottom nav routes to a screen 
   that contains BOTH functions — either:
   - Make "Reservar Clase" and "Mis Reservas" two tabs/segments at the top of the same screen 
     (segmented control: "Reservar" | "Mis reservas"), so bottom nav "Reservas" opens this 
     screen with "Reservar" tab active by default, OR
   - Add a small icon button (calendar-check icon) in the top-right corner of the Reservar 
     Clase screen header, next to the "ES" language selector, that navigates directly to 
     Mis Reservas

b) Dashboard: the "Próxima clase" card should also link to Mis Reservas when tapped (not just 
   to class detail) — or add a small "Ver todas mis reservas" text link below that card.

Pick option (a) with the segmented control as the primary fix since it's the most discoverable 
and consistent with how reservations apps typically work — implement both tabs in the same 
frame structure if feasible.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. MI PERFIL — FIX "NOTIFICACIONES", "POLÍTICA DE PRIVACIDAD", "AYUDA Y SOPORTE"
These three menu items currently do nothing on tap. Build destinations:

"Notificaciones" → navigate to new screen "Notificaciones":
- Header: back arrow → Perfil, title "Notificaciones"
- List of toggle switches (on/off), each row: label + description + switch
  - "Recordatorios de clases" — "Recibe un aviso 30 min antes de tu clase"
  - "Resumen semanal de progreso" — "Un resumen cada domingo"
  - "Mensajes del Agente IA" — "Notificaciones cuando Steffany AI tenga una recomendación"
  - "Promociones y novedades" — "Ofertas y noticias de Steffany Solano"
- Toggle style: track 44x24px, off = #C4C4C4, on = #1A6B4A, thumb white

"Política de privacidad" → navigate to new screen "Política de privacidad":
- Header: back arrow → Perfil, title "Política de privacidad"
- Scrollable text content area with placeholder section headers: "Información que recopilamos", 
  "Cómo usamos tu información", "Tus derechos", "Contacto" — use placeholder lorem-style body 
  text under each, this is a content screen not an interactive one
- Last updated date at top: "Última actualización: enero 2026"

"Ayuda y soporte" → navigate to new screen "Ayuda y soporte":
- Header: back arrow → Perfil, title "Ayuda y soporte"
- Search input at top: "Buscar en preguntas frecuentes"
- FAQ accordion list (collapsed by default, tap to expand), 5-6 items:
  - "¿Cómo reservo una clase?"
  - "¿Cómo cancelo una reserva?"
  - "¿Qué significan las insignias?"
  - "¿Cómo interpreto mi reporte de evaluación?"
  - "¿Cómo cambio mi método de pago?"
- Bottom card: "¿No encontraste lo que buscabas?" with a button "Contactar a soporte" 
  (opens email/chat placeholder — can show a toast "Próximamente" on tap)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. RESERVAR CLASE — REMOVE "UNIRME A LISTA DE ESPERA" (NO FUNCTIONALITY)
On full/sold-out class cards, remove the "Unirme a lista de espera" link entirely for now — 
do not leave non-functional UI elements visible. The card for a full class should show only:
- Class name, time, instructor (existing)
- "Sin cupos disponibles" text in #C62828, replacing the spots-available text
- Disabled gray "Sin cupos" button (background #C4C4C4, text #767676, not tappable)
No waitlist link, no other secondary action on full class cards in this version.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. RESERVAR CLASE — VARY CLASS LIST PER DAY
Currently switching between day tabs (Lun, Mar, Mié...) shows identical class cards every day. 
Fix so each day has a distinct, realistic schedule:

Example variation pattern across the week:
- Lun 25: Entrenamiento Box 6:00 AM (Alto, 3 cupos) · Pilates 8:00 AM (Medio, 5 cupos) · 
  Aeróbicos 6:00 PM (Bajo, 4 cupos)
- Mar 26: Pilates 7:00 AM (Medio, 6 cupos) · Entrenamiento Box 5:00 PM (Alto, Sin cupos) · 
  Aeróbicos 7:00 PM (Bajo, 2 cupos)
- Mié 27: Entrenamiento Box 6:00 AM (Alto, 3 cupos) · Pilates 8:00 AM (Medio, 5 cupos) · 
  Aeróbicos 10:00 AM (Bajo, 2 cupos) · Entrenamiento Box 5:00 PM (Alto, 4 cupos) · 
  Pilates 6:30 PM (Medio, 6 cupos)
- Jue 28: Pilates 7:00 AM (Medio, Sin cupos) · Aeróbicos 9:00 AM (Bajo, 3 cupos)
- Vie 29: Entrenamiento Box 6:00 AM (Alto, 2 cupos) · Pilates 8:00 AM (Medio, 4 cupos) · 
  Entrenamiento Box 6:00 PM (Alto, 5 cupos)
- Sáb 30: Aeróbicos 9:00 AM (Bajo, 6 cupos) · Pilates 10:30 AM (Medio, 4 cupos)
- Dom 31: no classes scheduled — show empty state: icon + text "No hay clases programadas 
  este día" centered in the content area

Vary: number of classes per day (some days fewer), times, intensity levels, and available 
spots (including some fully booked classes per point 4, and some days with more open availability).
This ensures the day-switching interaction actually feels functional and the "Lleno" day 
indicators (from previous fixes) make sense.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. DASHBOARD — FIX "PRÓXIMA CLASE" CARD: CANCEL BUTTON + ATTENDEE CIRCLES
a) "Cancelar" button (currently dead) → on tap, show a confirmation alert/modal:
   "¿Seguro que deseas cancelar tu reserva de Entrenamiento Box el [fecha]?"
   Two buttons: "No, mantener" (secondary, outlined) and "Sí, cancelar" (destructive, #C62828)
   On confirm: remove/update the card to show an empty state "No tienes clases próximas" with 
   a button "Reservar una clase" → Reservar Clase screen. Also show a toast "Reserva cancelada".

b) Attendee circles (currently ambiguous gray circles + "+5 more" text):
   Replace with a clearer pattern:
   - Add a small people/users icon (outline style, 16px) immediately to the left of the circles
   - Change the circles to small avatar placeholders (32px diameter, initials or silhouette icon, 
     light gray background #F5F5F5, border 1px white) overlapping slightly (-8px margin)
   - Update text from "+5 more" to "+5 personas más" — or simplify to one clear line: 
     "8 personas inscritas" with the icon, removing the circle avatars entirely if a cleaner 
     read is preferred
   - Recommended simplified version: just the people icon + text "8 personas inscritas" in 
     #767676, 13px — drop the avatar circles altogether since they add visual noise without 
     adding real information (no usable user identification at that size)
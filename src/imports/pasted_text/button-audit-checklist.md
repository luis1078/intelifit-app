CONTEXT — PROTOTYPE V2.3 / FULL BUTTON AUDIT — ZERO DEAD BUTTONS POLICY
Mobile fitness coaching app for Steffany Solano. Frame 390x844px. 
CRITICAL REQUIREMENT: every single tappable element in this prototype must have a defined 
interaction — either a navigation, a state change, or a placeholder feedback response. 
No button, icon, link, or tab may be visually present without a connected action. 
Go screen by screen and apply this rule exhaustively.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RULE FOR THIS AUDIT
Every interactive element falls into one of three categories. Apply the matching action type 
to ALL elements, with no exceptions:

TYPE A — Navigation: button leads to another screen → connect with a prototype link 
(slide/dissolve transition as appropriate).
TYPE B — State change: toggle, tab, filter, sort, checkbox → connect with an interactive 
component variant or overlay that visibly updates in place.
TYPE C — Not yet built in this version: if a feature genuinely has no destination screen yet, 
it must still respond with a small toast/snackbar at the bottom: "Próximamente disponible" — 
NEVER leave it with zero feedback. A button that does nothing on tap is not acceptable, even 
for unfinished features.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCREEN-BY-SCREEN CHECKLIST — VERIFY EVERY ITEM BELOW

LANDING PAGE
□ "Comenzar ahora" CTA → Type A → Registro Step 1
□ "Iniciar sesión" navbar link → Type A → Login
□ Logo (top-left) → Type A → stays on Landing / scrolls to top
□ Language selector "ES" → Type B → opens language dropdown (even if only Spanish works for now, show the dropdown with "Próximamente" toast on other languages)
□ Each service card (Evaluación Integral, Clases Grupales, etc.) → Type A → service detail screen, or Type C toast if detail screens don't exist yet
□ Testimonial carousel arrows/dots (if present) → Type B → cycles testimonials

REGISTRO (Steps 1-3)
□ "Continuar" button each step → Type A → next step
□ Back arrow each step → Type A → previous step
□ "Ya tienes cuenta? Inicia sesión" link → Type A → Login
□ Password visibility eye-icon toggle → Type B → shows/hides password text
□ Plan selection cards (step 3) → Type B → selected state highlight, then enables "Confirmar" button

LOGIN
□ "Iniciar sesión" button → Type A → Dashboard
□ "¿Olvidó su contraseña?" → Type A → Recuperar contraseña screen
□ "Crear cuenta" link → Type A → Registro Step 1
□ Password visibility eye-icon → Type B
□ Language selector "ES" → Type B

RECUPERAR CONTRASEÑA
□ "Enviar enlace" button → Type A → confirmation state on same screen
□ Back arrow → Type A → Login
□ "Volver a iniciar sesión" (post-confirmation) → Type A → Login

PAGO / PAYMENT SCREEN
□ "Tarjeta" / "Yape-Plin" tabs → Type B → switches form content
□ CVV eye-icon → Type B
□ "Guardar tarjeta" checkbox → Type B
□ "Confirmar pago" → Type A → Payment Success screen
□ "Términos y condiciones" underlined text → Type A → terms screen, or Type C toast
□ Back arrow → Type A → Registro Step 3

PAYMENT SUCCESS
□ "Ir al inicio" → Type A → Dashboard
□ "Ver detalles del plan" → Type A → Mi Perfil (plan section), or Type C toast

DASHBOARD
□ Avatar/profile photo (top-left) → Type A → Mi Perfil
□ Language selector "ES" → Type B
□ "Última evaluación" card (full card tap) → Type A → Mi Progreso
□ "Próxima clase" card (full card tap, excluding cancel button) → Type A → Mis Reservas or class detail
□ "Cancelar" button inside próxima clase card → Type B → confirmation alert → on confirm, updates card state
□ "Mi Progreso" quick access card → Type A → Mi Progreso
□ "Mis Rutinas" quick access card → Type A → Mis Rutinas
□ "Reservar Clase" quick access card → Type A → Reservar Clase
□ "Agente IA" quick access card → Type A → Agente IA chat
□ Steffany AI message card (bottom, full card tap) → Type A → Agente IA chat
□ Bottom nav: Inicio / Progreso / Reservas / Agente / Perfil → Type A each, all 5 must route correctly

MI PROGRESO
□ Back arrow → Type A → Dashboard
□ Period selector 1M / 3M / 6M → Type B → updates chart data + active pill
□ Chart data points (if tappable) → Type B → shows tooltip with exact value
□ "Ver reporte completo" → Type A → Reporte Completo screen
□ Bottom nav (must be present here too) → Type A each
□ Language selector "ES" → Type B

REPORTE COMPLETO
□ Back arrow → Type A → Mi Progreso
□ "Descargar PDF" → Type C toast "Próximamente disponible" (no real PDF generation in prototype)
□ Any expandable section headers → Type B → expand/collapse

MIS RUTINAS
□ Back arrow → Type A → Dashboard
□ Day tabs (week view) → Type B → updates exercise list shown
□ Exercise "completado" checkbox per item → Type B → toggles checked state, updates day progress bar
□ Video-play icon per exercise → Type A → opens video player overlay, or Type C toast if no video asset
□ Bottom nav → Type A each

RESERVAR CLASE / MIS RESERVAS (segmented control screen)
□ "Reservar" / "Mis reservas" segmented tabs → Type B → switches view
□ Sort dropdown ("Más popular" etc.) → Type B → opens options, reorders list on selection
□ Filter pills (Box / Pilates / Aeróbicos) → Type B → filters visible classes
□ Day tabs (Lun-Dom) → Type B → updates class list for that day (now with varied content per day 5 from previous fixes)
□ Each "Reservar" button (available classes) → Type A → booking confirmation modal
□ Each "Sin cupos" button (full classes) → Type B → disabled, but if tapped shows Type C toast "Esta clase está completa"
□ Calendar-check icon shortcut (if added) → Type A → Mis Reservas tab
□ Inside Mis Reservas tab: "Cancelar reserva" per card → Type B → confirmation alert → removes card on confirm
□ Mis Reservas empty state "Reservar una clase" button → Type A → Reservar tab
□ Back arrow → Type A → Dashboard
□ Bottom nav → Type A each

BOOKING CONFIRMATION MODAL
□ "Ver mis reservas" → Type A → Mis Reservas
□ "Volver al inicio" → Type B → dismiss modal only
□ Tap outside overlay → Type B → dismiss modal
□ X close icon (if present in modal corner) → Type B → dismiss modal

AGENTE IA
□ Back arrow → Type A → Dashboard
□ Quick suggestion chips → Type B → sends that message, shows AI response
□ Text input + send button → Type B → sends typed message, shows AI response
□ Bottom nav → Type A each

MI PERFIL
□ Back arrow (if present) → Type A → Dashboard
□ Avatar / "Editar foto" → Type B → opens photo picker placeholder, or Type C toast
□ "Editar perfil" → Type A → edit profile screen (editable fields), or Type B inline edit mode
□ Each badge/insignia icon → Type B → opens detail popover (per previous fix)
□ "i" info icon next to Insignias title → Type B → opens overview tooltip
□ "Notificaciones" row → Type A → Notificaciones screen
□ "Política de privacidad" row → Type A → Política screen
□ "Ayuda y soporte" row → Type A → Ayuda screen
□ "Plan activo" section / "Cambiar plan" link (if present) → Type A → plan selection screen, or Type C toast
□ "Historial de pagos" row (if present) → Type A → payment history screen, or Type C toast
□ "Cerrar sesión" → Type A → Landing page (with confirmation alert: "¿Seguro que deseas cerrar sesión?")
□ Bottom nav → Type A each

NOTIFICACIONES
□ Back arrow → Type A → Mi Perfil
□ Each toggle switch → Type B → on/off state change

POLÍTICA DE PRIVACIDAD
□ Back arrow → Type A → Mi Perfil
(static content screen, no further interactive elements required)

AYUDA Y SOPORTE
□ Back arrow → Type A → Mi Perfil
□ Search input → Type B → filters FAQ list as user types
□ Each FAQ accordion item → Type B → expand/collapse answer
□ "Contactar a soporte" button → Type C toast "Próximamente disponible"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DELIVERABLE EXPECTATION
After applying this audit, every frame in the file should have zero orphaned interactive 
elements. As a final step, list out (in a comment or summary note inside the Figma file) any 
button you were unable to connect and why — for example, if a destination screen genuinely 
does not exist and a Type C toast was used instead of a real screen. This list lets us review 
exactly which flows are placeholder vs fully functional before usability testing.
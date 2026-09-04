FROM caddy:2.9-alpine
COPY docker/caddy/Caddyfile /etc/caddy/Caddyfile
# Caddy run en user non-root par défaut via l'image, on garde le comportement
# du compose (tmpfs /data /config). Pas de CMD à override, on utilise celui de l'image.

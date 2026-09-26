RXVEYRA 2.0 — OpenAI AI ulanishi

1. Terminalda loyiha papkasiga kiring.
2. npm install
3. .env.example faylidan nusxa olib .env nomi bering.
4. .env ichidagi OPENAI_API_KEY qiymatini o'zingizning API kalitingiz bilan to'ldiring.
   API kalitni hech qachon chatga yoki frontend kodiga yozmang.
5. npm start
6. Brauzerda http://localhost:3000 ni oching.

Frontend /api/analyze endpointiga ulanadi va server OpenAI Responses API orqali tahlil oladi.


TELEFONLARDAN ULASH
- Bir xil Wi‑Fi'dagi telefonlar uchun kompyuter/server IP manzilidan foydalaning:
  http://KOMPYUTER_IP:3000
- Windows: CMD -> ipconfig -> IPv4 Address.
- Masalan: http://192.168.1.10:3000
- Firewall 3000-portga ruxsat berishi kerak.
- Internet orqali istalgan telefon/qurilmadan ishlashi uchun serverni internetga deploy qilish kerak.
  Deploy qilingandan keyin frontend API'lari relative URL ishlatgani uchun alohida IP yozish shart emas.

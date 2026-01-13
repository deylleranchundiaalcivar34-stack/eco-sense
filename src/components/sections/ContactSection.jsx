const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Contáctanos <span className="text-primary">Por:</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ==== FORM ==== */}
          <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-muted-foreground rounded-md bg-background/50 text-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-muted-foreground rounded-md bg-background/50 text-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu correo"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border border-muted-foreground rounded-md bg-background/50 text-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu mensaje"
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="cosmic-button">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>

          {/* ==== COMPANY INFO ==== */}
          <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-lg space-y-6">
            <h3 className="text-2xl font-semibold">
              Información de la <span className="text-primary"> compañia</span>
            </h3>

            <p className="text-foreground/80">
              Si deseas conocer más sobre el Grifo Inteligente EcoSense,
              realizar una compra o solicitar soporte técnico, contáctanos
              mediante el formulario o la información a continuación.
            </p>

            <div className="space-y-4 text-sm">
              <div>
                <span className="font-medium text-foreground">📍 Dirección:</span>
                <p className="text-foreground/70">Pasaje B y calle Juan de Dios Morales, sector Parque Los Leones - Riobamba, Ecuador</p>
              </div>

              <div>
                <span className="font-medium text-foreground">📧 Correo:</span>
                <p className="text-foreground/70">deylleranchundiaalcivar34@gmail.com</p>
              </div>

              <div>
                <span className="font-medium text-foreground">📞 Número celular:</span>
                <p className="text-foreground/70">+593 93 921 2684</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

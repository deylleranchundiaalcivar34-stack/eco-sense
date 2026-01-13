import { User, Leaf, Home } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-40 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Sobre <span className="text-primary">Nosotros:</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Información */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold">Nuestra Misión</h3>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Este proyecto tiene como finalidad ofrecer una solución tecnológica sostenible para el uso eficiente del agua en hogares.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              El dispositivo se conecta mediante la página web que permite visualizar estadísticas de uso, controlar el flujo del agua y fomentar prácticas responsables en el consumo diario.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              EcoSense busca promover el uso responsable del agua, ofreciendo soluciones tecnológicas que permitan controlar, medir y reducir el consumo diario de agua en hogares y oficinas.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Ser líderes en innovación de productos inteligentes que fomenten hábitos sostenibles, contribuyendo a un futuro más consciente y ecológico.
            </p>
          </div>

          {/* Tarjetas de características */}
          <div className="grid grid-cols-1 gap-8">
            {/* Card 1 */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg md:text-xl font-semibold">Apoyo a Familias</h4>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Soluciones prácticas para hogares que buscan optimizar el consumo de agua y cuidar el ambiente.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg md:text-xl font-semibold">Impulso a la ESPOCH</h4>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Fomentamos la innovación y creatividad de los estudiantes de la ESPOCH mediante proyectos prácticos.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg md:text-xl font-semibold">Compromiso Ambiental</h4>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Fomentamos hábitos responsables y sostenibles en el consumo de recursos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

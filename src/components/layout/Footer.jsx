const Footer = () => {
  return (
    <footer className="bg-background/90 backdrop-blur-md border-t border-border py-6 mt-16 text-center">
      <p className="text-sm text-foreground/70">
        © {new Date().getFullYear()} EcoTech. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
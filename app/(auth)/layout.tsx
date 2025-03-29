export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        {/* Contenido */}
        <div className="relative z-10 w-full max-w-md flex flex-col" style={{ marginBottom: "-235px" }}>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="font-bold text-xl text-gray-800">Dashboard</span>
              <span className="text-xl text-gray-500">|</span>
              <span className="font-bold text-xl text-gray-800">René</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1 mb-1">Bienvenido a tu Dashboard</h1>
            <p className="text-gray-600">KuhmDev Developer</p>
          </div>
        </div>
        
        {/* El formulario (children) ahora está separado para mejor control */}
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }
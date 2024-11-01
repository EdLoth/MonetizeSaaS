import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Protege todas as rotas dentro de /dashboard
])

export default clerkMiddleware(async (auth, req) => {
  // Verifica se a rota é protegida
  if (isProtectedRoute(req)) {
    try {
      // Executa auth.protect() apenas se a rota for protegida
      await auth.protect()
    } catch {
      // Redireciona para a página de login se o usuário não estiver autenticado
      const loginUrl = new URL('/', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Se a rota não for protegida ou o usuário estiver autenticado, segue normalmente
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Aplica o middleware a todas as rotas
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Executa nas rotas da API
    '/(api|trpc)(.*)',
  ],
}

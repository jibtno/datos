import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  
  console.log('[Auth Callback] Code:', !!code, 'Error:', error);
  
  if (error) {
    console.error('[Auth Callback] OAuth error:', error);
    return NextResponse.redirect(new URL('/auth/signin?error=' + error, requestUrl.origin));
  }
  
  if (code) {
    try {
      const cookieStore = cookies(); // ✅ NO await
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: any) {
              cookieStore.delete({ name, ...options });
            },
          },
        }
      );
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('[Auth Callback] Exchange error:', exchangeError);
        return NextResponse.redirect(new URL('/auth/signin?error=exchange_failed', requestUrl.origin));
      }
      
      console.log('[Auth Callback] Session created successfully:', !!data.session);
    } catch (error) {
      console.error('[Auth Callback] Unexpected error:', error);
      return NextResponse.redirect(new URL('/auth/signin?error=unexpected', requestUrl.origin));
    }
  }
  
  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/admin', requestUrl.origin));
}
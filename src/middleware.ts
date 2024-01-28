import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify, importJWK } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET || "JOSE_SECRET",
    };
    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(token!.value, secretKey);
    // console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    request.cookies.clear();
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: ["/mydiary/:path*"],
};

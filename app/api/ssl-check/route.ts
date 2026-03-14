import { NextRequest, NextResponse } from "next/server";
import * as tls from "tls";
import * as net from "net";

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "domain is required" }, { status: 400 });

  return new Promise<NextResponse>((resolve) => {
    const socket = tls.connect({ host: domain, port: 443, servername: domain, rejectUnauthorized: false }, () => {
      try {
        const cert = socket.getPeerCertificate(true);
        if (!cert || !cert.subject) {
          socket.destroy();
          resolve(NextResponse.json({ error: "No certificate found" }, { status: 400 }));
          return;
        }
        const validTo = new Date(cert.valid_to);
        const validFrom = new Date(cert.valid_from);
        const daysRemaining = Math.floor((validTo.getTime() - Date.now()) / 1000 / 60 / 60 / 24);
        const data = {
          valid: daysRemaining > 0,
          subject: cert.subject?.CN ?? cert.subject?.O ?? domain,
          issuer: cert.issuer?.O ?? cert.issuer?.CN ?? "Unknown",
          validFrom: validFrom.toLocaleDateString(),
          validTo: validTo.toLocaleDateString(),
          daysRemaining,
          protocol: socket.getProtocol() ?? "TLS",
          fingerprint: cert.fingerprint ?? "",
        };
        socket.destroy();
        resolve(NextResponse.json(data));
      } catch (e: any) {
        socket.destroy();
        resolve(NextResponse.json({ error: e.message }, { status: 500 }));
      }
    });

    socket.setTimeout(8000, () => {
      socket.destroy();
      resolve(NextResponse.json({ error: "Connection timed out" }, { status: 408 }));
    });

    socket.on("error", (e) => {
      resolve(NextResponse.json({ error: e.message }, { status: 500 }));
    });
  });
}

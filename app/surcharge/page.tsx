import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentSurcharge, getHistoricalSurcharges, formatSurchargeDate } from "@/lib/data"
import { TrendingUp, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iron Surcharge | Rochester Metal Products",
  description: "Current and historical iron surcharge rates for gray and ductile iron castings at Rochester Metal Products.",
}

// Revalidate every hour so rate updates show promptly
export const revalidate = 3600

export default function SurchargePage() {
  const current = getCurrentSurcharge()
  const historical = getHistoricalSurcharges(6)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-4xl px-4 py-16">

        {/* Page heading */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold tracking-widest uppercase mb-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            RMP
          </div>
          <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Iron Surcharge
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Surcharge rates are applied per pound of raw casting and are updated monthly based on market conditions.
          </p>
        </div>

        {/* Current surcharge */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Current Surcharge
          </h2>
          <p className="text-sm text-muted-foreground mb-5">Surcharge rate per pound of raw casting:</p>

          {current ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Ductile */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Ductile Iron
                </div>
                <div className="text-4xl font-bold text-foreground">
                  ${current.ductile.toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">per pound</div>
              </div>

              {/* Gray */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Gray Iron
                </div>
                <div className="text-4xl font-bold text-foreground">
                  ${current.gray.toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">per pound</div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
              No current surcharge data available.
            </div>
          )}

          {current && (
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Effective {formatSurchargeDate(current.date)}
            </p>
          )}
        </div>

        {/* Historical data */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Prior Data
          </h2>
          <p className="text-sm text-muted-foreground mb-5">Surcharge rate per pound of raw casting:</p>

          {historical.length > 0 ? (
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Period</th>
                    <th className="text-right px-5 py-3 font-semibold text-foreground">Ductile</th>
                    <th className="text-right px-5 py-3 font-semibold text-foreground">Gray</th>
                  </tr>
                </thead>
                <tbody>
                  {historical.map((entry, i) => (
                    <tr
                      key={entry.date}
                      className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                    >
                      <td className="px-5 py-3 text-muted-foreground">{formatSurchargeDate(entry.date)}</td>
                      <td className="px-5 py-3 text-right font-mono text-foreground">${entry.ductile.toFixed(4)}</td>
                      <td className="px-5 py-3 text-right font-mono text-foreground">${entry.gray.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
              No historical data available yet.
            </div>
          )}
        </div>

      </section>

      <Footer />
    </main>
  )
}

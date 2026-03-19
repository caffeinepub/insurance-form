import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useGetAllSubmissions } from "../hooks/useQueries";

export default function AdminPage() {
  const { data: submissions, isLoading, isError } = useGetAllSubmissions();

  const formatDate = (ts: bigint) => {
    try {
      return format(new Date(Number(ts / BigInt(1_000_000))), "MMM d, yyyy");
    } catch {
      return "—";
    }
  };

  const typeColors: Record<string, string> = {
    life: "bg-blue-100 text-blue-800",
    health: "bg-green-100 text-green-800",
    vehicle: "bg-amber-100 text-amber-800",
    property: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-4 mb-8">
            <a href="/" data-ocid="admin.link">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </Button>
            </a>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                All submitted insurance applications
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              "Total Applications",
              "Pending Review",
              "This Month",
              "Approved",
            ].map((label, i) => (
              <div
                key={label}
                className="bg-card rounded-xl border border-border p-4"
              >
                <p className="text-xs text-muted-foreground font-medium">
                  {label}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {isLoading ? (
                    <Skeleton className="h-7 w-12" />
                  ) : i === 0 ? (
                    (submissions?.length ?? 0)
                  ) : i === 1 ? (
                    (submissions?.filter((s) => s.status === "pending")
                      .length ?? 0)
                  ) : i === 2 ? (
                    (submissions?.length ?? 0)
                  ) : (
                    (submissions?.filter((s) => s.status === "reviewed")
                      .length ?? 0)
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div
            className="bg-card rounded-xl border border-border overflow-hidden shadow-xs"
            data-ocid="admin.table"
          >
            <div className="px-6 py-4 border-b border-border flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Applications
              </h2>
            </div>
            {isLoading ? (
              <div className="p-6 space-y-3" data-ocid="admin.loading_state">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Skeleton key={n} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <div
                className="p-10 text-center text-muted-foreground"
                data-ocid="admin.error_state"
              >
                <p className="text-sm">
                  Failed to load applications. Please refresh.
                </p>
              </div>
            ) : !submissions?.length ? (
              <div className="p-10 text-center" data-ocid="admin.empty_state">
                <p className="text-muted-foreground text-sm">
                  No applications submitted yet.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-semibold">
                      Ref #
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Applicant
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Email
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Coverage
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Submitted
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((app, idx) => (
                    <TableRow
                      key={String(app.id)}
                      data-ocid={`admin.row.item.${idx + 1}`}
                    >
                      <TableCell className="font-mono text-xs font-semibold text-primary">
                        SC-{String(app.id).padStart(6, "0")}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {app.firstName} {app.lastName}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {app.email}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColors[app.insuranceType] || "bg-gray-100 text-gray-700"}`}
                        >
                          {app.insuranceType.charAt(0).toUpperCase() +
                            app.insuranceType.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        ${app.coverageAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            app.status === "reviewed" ? "default" : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formatDate(app.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/db";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { createService, deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Dịch vụ</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-border bg-background text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Tên dịch vụ</th>
              <th className="px-4 py-3 font-medium">Mô tả</th>
              <th className="px-4 py-3 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const deleteWithId = deleteService.bind(null, service.id);
              return (
                <tr key={service.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{service.title}</td>
                  <td className="px-4 py-3 text-muted">{service.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="text-accent hover:underline"
                      >
                        Sửa
                      </Link>
                      <form action={deleteWithId}>
                        <ConfirmSubmitButton
                          confirmMessage={`Xoá dịch vụ "${service.title}"?`}
                          className="text-red-600 hover:underline"
                        >
                          Xoá
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {services.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-muted">
                  Chưa có dịch vụ nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 max-w-lg">
        <h2 className="text-lg font-semibold text-foreground">Thêm dịch vụ</h2>
        <form action={createService} className="mt-4 flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Tên dịch vụ
            </label>
            <input
              id="title"
              name="title"
              required
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="self-start rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Thêm dịch vụ
          </button>
        </form>
      </div>
    </div>
  );
}

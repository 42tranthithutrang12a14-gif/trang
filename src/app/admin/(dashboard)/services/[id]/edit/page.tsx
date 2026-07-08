import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { updateService, deleteService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const serviceId = Number(id);

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) notFound();

  const updateWithId = updateService.bind(null, serviceId);
  const deleteWithId = deleteService.bind(null, serviceId);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-foreground">Sửa dịch vụ</h1>

      <form action={updateWithId} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-foreground">
            Tên dịch vụ
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={service.title}
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
            rows={4}
            defaultValue={service.description}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Lưu thay đổi
          </button>
          <a
            href="/admin/services"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
          >
            Huỷ
          </a>
        </div>
      </form>

      <form action={deleteWithId} className="mt-8 border-t border-border pt-6">
        <ConfirmSubmitButton
          confirmMessage={`Xoá dịch vụ "${service.title}"? Hành động này không thể hoàn tác.`}
          className="rounded-full border border-red-200 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Xoá dịch vụ này
        </ConfirmSubmitButton>
      </form>
    </div>
  );
}

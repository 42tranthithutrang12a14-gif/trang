import type { Category } from "@/generated/prisma/client";

type CategoryLike = Pick<Category, "id" | "parentId">;
type CategoryNode<T> = T & { children: CategoryNode<T>[] };

// Dựng cây từ danh sách phẳng (đã sắp theo order).
export function buildCategoryTree<T extends CategoryLike>(categories: T[]): CategoryNode<T>[] {
  const nodes = new Map<number, CategoryNode<T>>(
    categories.map((c) => [c.id, { ...c, children: [] }])
  );
  const roots: CategoryNode<T>[] = [];

  for (const c of categories) {
    const node = nodes.get(c.id)!;
    if (c.parentId && nodes.has(c.parentId)) {
      nodes.get(c.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

// Trả về id của category và toàn bộ hậu duệ (con, cháu, ...) — dùng khi lọc sản phẩm
// theo 1 danh mục cha thì hiện luôn sản phẩm trong các danh mục con.
export function getDescendantIds(categoryId: number, categories: CategoryLike[]): number[] {
  const ids = [categoryId];
  const children = categories.filter((c) => c.parentId === categoryId);
  for (const child of children) {
    ids.push(...getDescendantIds(child.id, categories));
  }
  return ids;
}

// Trả về id của category và toàn bộ hậu duệ — dùng để chặn chọn 1 danh mục con/cháu
// của chính nó làm danh mục cha (tránh vòng lặp vô hạn trong cây).
export function getSelfAndDescendantIds(
  categoryId: number,
  categories: CategoryLike[]
): Set<number> {
  return new Set(getDescendantIds(categoryId, categories));
}

// Danh sách phẳng có kèm "độ sâu" để hiển thị thụt lề trong <select>.
export function flattenWithDepth<T extends CategoryLike>(
  nodes: CategoryNode<T>[],
  depth = 0
): { category: T; depth: number }[] {
  return nodes.flatMap((node) => [
    { category: node, depth },
    ...flattenWithDepth(node.children, depth + 1),
  ]);
}

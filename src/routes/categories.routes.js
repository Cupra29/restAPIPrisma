import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  res.json(categories);
});

router.get("/categories/:id", async (req, res) => {
  const categoryFound = await prisma.category.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      products: true,
    },
  });

  if (!categoryFound)
    return res.status(404).json({ error: "Category not found" });

  return res.json(categoryFound);
});

router.post("/categories/", async (req, res) => {
  const newCategory = await prisma.category.create({
    data: req.body,
  });
  res.json(newCategory);
});

router.delete("/categories/:id", async (req, res) => {
  const categoryDeleted = await prisma.category.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!categoryDeleted)
    return res.status(404).json({ error: "Category not found" });

  return res.json(categoryDeleted);
});

router.put("/categories/:id", async (req, res) => {
  const categoryUpdated = await prisma.category.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });
  return res.json(categoryUpdated);
});

export default router;

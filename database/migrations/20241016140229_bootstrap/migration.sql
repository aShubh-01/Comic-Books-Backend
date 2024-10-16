-- CreateTable
CREATE TABLE "ComicBook" (
    "id" SERIAL NOT NULL,
    "bookName" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "description" TEXT,
    "publishedYear" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "pages" INTEGER,
    "discount" DECIMAL(5,2) DEFAULT 0.00,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ComicBook_pkey" PRIMARY KEY ("id")
);

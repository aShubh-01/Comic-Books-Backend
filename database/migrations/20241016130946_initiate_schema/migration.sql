-- CreateTable
CREATE TABLE "ComicBook" (
    "id" SERIAL NOT NULL,
    "bookName" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "description" TEXT,
    "PublishedYear" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" DECIMAL(5,2) DEFAULT 0.00,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ComicBook_pkey" PRIMARY KEY ("id")
);

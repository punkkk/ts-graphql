import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Author, Book } from "../../entities";
import { AuthorInput } from "./types/author-input";
import { BookInput } from "./types/book-input";

@Service()
@Resolver((of) => Book)
export class BooksResolver {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorsRepository: Repository<Author>,
  ) {}

  @Query((returns) => Book, { nullable: true })
  async book(@Arg("bookId", (type) => Int) bookId: number) {
    return this.booksRepository.findOne(bookId);
  }

  @Query((returns) => [Book], { nullable: true })
  async books() {
    return this.booksRepository.find();
  }

  @Mutation((returns) => Book)
  async addBook(@Arg("book") bookInput: BookInput): Promise<Book> {
    const authors = await Promise.all(bookInput.authors.map((id) => this.authorsRepository.findOneOrFail(id)));

    const book = this.booksRepository.create({
      ...bookInput,
      authors: authors,
    });

    return await this.booksRepository.save(book);
  }

  // todo move to its own resolver
  @Mutation((returns) => Author)
  async addAuthor(@Arg("author") authorInput: AuthorInput): Promise<Author> {
    const books = await Promise.all(authorInput.books.map((id) => this.booksRepository.findOneOrFail(id)));

    const author = this.authorsRepository.create({
      ...authorInput,
      books: books,
    });

    return await this.authorsRepository.save(author);
  }
}

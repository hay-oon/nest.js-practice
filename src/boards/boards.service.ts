import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private customBoardRepo: BoardRepository,
  ) {}

  // Read
  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  // Create
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    // 커스텀 레포지토리의 메소드 사용
    return this.customBoardRepo.createBoard(createBoardDto, user);
  }

  // Read
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('해당 id는 없음!');
    }

    return found;
  }

  // Delete
  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      // affected : 삭제된 데이터의 개수
      throw new NotFoundException(`해당 'id:${id}'는 없어요!`);
    }
  }

  // Update
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}

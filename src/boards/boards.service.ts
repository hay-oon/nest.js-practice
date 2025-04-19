import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // private : 다른 컴포넌트에서 배열값을 수정할 수 없게 하기 위해 사용

  getAllBoards(): Board[] {
    return this.boards;
  }
}

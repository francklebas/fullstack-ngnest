import { Controller } from '@nestjs/common';
import { CyclesService } from './cycles.service.js';

@Controller('cycles')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}
  cycles() {
    return this.cyclesService.getCycles()
  }
}

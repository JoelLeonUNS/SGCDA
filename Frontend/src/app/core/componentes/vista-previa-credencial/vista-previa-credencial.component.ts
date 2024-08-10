import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-vista-previa-credencial',
  standalone: true,
  imports: [],
  templateUrl: './vista-previa-credencial.component.html',
  styleUrl: './vista-previa-credencial.component.css'
})
export class VistaPreviaCredencialComponent {
  @Input() comision: string = '';
  @Input() miembro: string = '';
  @Input() cargo: string = '';
  @Input() procesoPeriodo: string = '';
  @Input() fecha: string = '';
  @Input() hora: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const card = this.el.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12; // Máximo 10 grados
    const rotateX = ((centerY - y) / centerY) * 12; // Máximo 10 grados

    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const card = this.el.nativeElement;
    card.style.setProperty('--rotate-y', '0deg');
    card.style.setProperty('--rotate-x', '0deg');
  }
}

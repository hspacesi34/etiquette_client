import { Component, Inject, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  private componentRef: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      componentType: Type<any>;
      componentInputs: any;
      componentOutputs?: { [key: string]: (event: any) => void };
    }
  ) {}

  ngOnInit() {
    this.componentRef = this.container.createComponent(this.data.componentType);
    
    // Bind inputs
    if (this.data.componentInputs) {
      Object.assign(this.componentRef.instance, this.data.componentInputs);
    }

    // Bind outputs
    if (this.data.componentOutputs) {
      Object.entries(this.data.componentOutputs).forEach(([key, handler]) => {
        if (this.componentRef?.instance[key]?.subscribe) {
          this.componentRef.instance[key].subscribe(handler);
        }
      });
    }
  }
}

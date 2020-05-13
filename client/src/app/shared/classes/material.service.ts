import {ElementRef} from "@angular/core";
declare const M;
export interface MaterialInstance {
  open?(): void,
  close?(): void,
  destroy?(): void
}
export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
}
export class MaterialService {
  static toast(message: string) {
    M.toast({html: message});
  }
  static FloatingButton(floatBut: ElementRef) {
    M.FloatingActionButton.init(floatBut.nativeElement);
  }
  static udateFields() {
    M.updateTextFields();
  }
  static modalWindow(el: ElementRef): MaterialInstance {
    return M.Modal.init(el.nativeElement);
  }
  static materialTooltip(el: ElementRef): MaterialInstance {
    return M.Tooltip.init(el.nativeElement);
  }
  static materialTapTarget(el: ElementRef): MaterialInstance {
    let  element: Element = el.nativeElement;
    return  M.TapTarget.init(element);
  }
  static materialDatePicker(el: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(el.nativeElement, {
      showClearBtn: true,
      format: 'dd.mm.yyyy',
      onClose
    });
  }
  static materialSideNav(el: ElementRef) {
    return M.Sidenav.init(el.nativeElement);
  }
}

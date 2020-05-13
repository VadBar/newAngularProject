import {Injectable} from "@angular/core";
import {orderPosition, Position} from "../shared/interfaces";
@Injectable()
export class OrderService {
  list: orderPosition[] = [];
  price: number = 0;
  create(position: Position){
    let orderPos: orderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quanitity: position.quanitity,
      _id: position._id
    });
    let similierEl = this.list.find(p => p._id === orderPos._id);
    if(similierEl) {
      similierEl.quanitity += orderPos.quanitity;
    } else {
      this.list.push(orderPos);
    }
    this.udateData();
  }
  clear() {
    this.list = [];
    this.price = 0;
  }
  remove(position: Position) {
    let index = this.list.findIndex(p => p._id === position._id);
    this.list.splice(index, 1);
    this.udateData();
  }
  private udateData() {
    this.price = this.list.reduce((total, item) => {
      total += item.quanitity * item.cost;
      return total;
    }, 0);
  }
}

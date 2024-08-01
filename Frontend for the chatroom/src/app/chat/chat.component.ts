import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ChatserviceService } from '../../services/chatservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivatechatComponent } from '../privatechat/privatechat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

// we will use the ondestroy for the verification of the live users after the user is disconnected
export class ChatComponent  implements OnInit,OnDestroy{

  myname:string="hesham"
  constructor(public service:ChatserviceService,public mymodal:NgbModal) {
    
  }
  ngOnDestroy(): void {

// we will stop the connection for the user to remove him from the liveusers list 
    this.service.stopconnection()
  }


  // we will use the out put to move the data from the child to the parent component 
  @Output() ClosechatEmitter=new EventEmitter();
  ngOnInit(): void {

    // here we will start the connection when the component is loaded 
console.log("at tthe nginit")
    this.service.createchatconnection()
  }


backtohome(){

  this.ClosechatEmitter.emit();
}
sendMessag(content :string){
this.service.sendmessage(content);

}


// the next part is for the private chat 


openprivatechat(touser:string){

  // the chat will be opened throw the modal dialog 
const modalref =this.mymodal.open(PrivatechatComponent)
// and we will pass it it the to user name 
modalref.componentInstance.touser=touser;

}


}

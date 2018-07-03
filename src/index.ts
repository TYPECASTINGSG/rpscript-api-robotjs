/**
 * @module RobotJS
 */

import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';
import R from 'ramda';

var robot = require('robotjs');

@RpsModule("robotjs")
export default class RPSRobotjs {

  @rpsAction({verbName:'keyboard'})
  keyboard (ctx:RpsContext,opts:KeyboardOpts, text:string) : Promise<any> {

    return new Promise( (resolve, reject) => {
      let result = undefined;
      const options = R.merge(KEYBOARD_DEFAULT, opts);
  
      if(options.tap) result = robot.keyTap(text, options.tapModifier);
      else if(options.toggle) result = robot.keyToggle(text, options.toggle);
      else result = robot.typeStringDelayed(text, options.delay);
  
      resolve(result);
    });
  }

  @rpsAction({verbName:'mouse'})
  mouse (ctx:RpsContext,opts:MouseOpts, x?:number, y?:number) : Promise<any> {

    return new Promise( (resolve, reject) => {
      let result = undefined;
      const options = R.merge(MOUSE_DEFAULT, opts);
  
      if(options.click) result = robot.mouseClick(options.button, options.doubleClick);
  
      else if(options.drag) result = robot.mouseDrag(x, y);
  
      else if(options.scroll) result = robot.mouseScroll(x, y);
  
      else if(options.toggle) result = robot.mouseToggle(options.down, options.button);
  
      else if(options.smooth) result = robot.moveMouseSmooth(x, y);
  
      else result = robot.moveMouse(x, y);
  
      resolve(result);
    });
  }

  @rpsAction({verbName:'desktopInfo'})
  desktopInfo (ctx:RpsContext,opts:{}) : Promise<any> {
    return new Promise( (resolve, reject) => {
      let mousePos = robot.getMousePos();
      let pixelColor = robot.getPixelColor(mousePos.x, mousePos.y);
      let screensize = robot.getScreenSize();
  
      resolve({
        mousePosition:mousePos, pixelColor:pixelColor, screenSize:screensize
      });
    });
  }

}



interface KeyboardOpts {
  delay?:number;
  tap?:boolean;
  tapModifier?:string[];
  toggle?:string;
}
const KEYBOARD_DEFAULT:KeyboardOpts = {delay:800 , tap:false, toggle:'', tapModifier:[]};


interface MouseOpts {
  smooth?:boolean;
  click?: boolean;
  toggle?: boolean;
  drag?: boolean;
  scroll?: boolean;

  button?:string;
  doubleClick?:boolean;
  down?:string;
}
const MOUSE_DEFAULT:MouseOpts = {
  smooth:false, click:false, toggle:false, drag:false, scroll:false,
  button:'left', doubleClick:false, down:'down'
};
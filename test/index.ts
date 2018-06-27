import {expect} from 'chai';
import m from 'mocha';

import RPSRobotjs from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('RobotJS', () => {

  m.it('type something and move mouse', async function () {
    let context = new RpsContext;
    let desktop = new RPSRobotjs;

    await desktop.keyboard(context,{},"period");

    await desktop.mouse(context,{},1,1);

    
  }).timeout(0);

})

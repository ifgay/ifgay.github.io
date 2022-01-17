
import { Tab, TabBarItem, Article } from 'react-weui';
//import styles
import './App.css'
import One from './page/one/index.js'
import Two from './page/two/index.js'
import Three from './page/three/index.js'

import noteIcon from './icon/note.svg'
import toolIcon  from './icon/tool.svg'
import trendsIcon from './icon/trends.svg'

function App() {
  return ( <Tab className="fixed_bottom"  type="tabbar">
  <TabBarItem  icon={<img  alt='note' src={noteIcon}/>} label="日记">
      <Article>
        <One></One>
      </Article>
  </TabBarItem>
  <TabBarItem icon={<img alt='trends' src={trendsIcon}/>} label="收藏">
      <Article>
      <Two></Two>
      </Article>
  </TabBarItem>
  <TabBarItem icon={<img  alt='tool' src={toolIcon}/>} label="工具">
      <Article>
      <Three></Three>
      </Article>
  </TabBarItem>
</Tab>
  );
}

export default App;

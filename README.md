# 实习所得
> 2021-8-1 到 2021-11-～ 我在云南楚雄泛联信息科技实习

## 感受和收获
- 第一收获当然是钱了，我刚开始进公司时候我想我能要到个两千就不错了，毕竟我又觉得比我优秀的人比比皆是
我面试的又是前端这种不是很辛苦耗头发的职业。然后，我还是说了我最想要的待遇3000。老板答应得真爽快，
我很满意。看了我的面试作品后，简单问了我的信息。然后老板问我tp怎么样？thinkphp？每接触过阿，但是知道
他的名气。
- 然后我就开始学习thinkphp还有jquery，这对我的技术提升真的很有帮助。我虽然会vue,但是在公司不能用，
前辈门学习成本又大了。接触jqeury还有前辈写的项目后我的看法就变了，原来jquery api这么多用法这么多样。
与vue等框架比起来他的优点也多，然后我也开始喜欢jquery起来。thinkphp我只能说目前还只是熟悉了吧，做医院
的项目的时候遇到了种种不顺，所以代码规范全没有。医院的项目对我的成长真的有很大的帮助，我真的缺少这种大型项目经验，
虽然对于前辈门来说是个小项目，我学会了调用微信接口，知道一个项目应该有管理端还有移动端，知道管理端应该有权限检验
，知道移动端多种用户登陆的多种情况。

- 另外就是我们的研发部的产品经理攀总了，我发现这人的一些闪光点。这人真的是一个很典型的程序员。
说话不妥他，讲究效率，沟通方式也直接有什么就说什么但是他的那种直接讲话没有人觉得不自在，理解能力也很强，也不会咄咄逼人那种。
我问了我的其他同事有没有这种感觉。大家都一致认为攀总真的不错。值得我们学习的。

## 糟糕的地方
卒中的项目为什么迟迟没有弄好呢?
- 我的个人原因
我缺乏大型项目的经验，这个项目开始的总体规划不是很好。所以弄的时候就是要这里又不合适，那里不合适的调整。
不论是代码还是样式，因为第一次规划很影响后面的改动。像这种数据字典多的我更是没有弄过，没什么经验。
就拿数据渲染来说，我不是很熟悉php所以使用了js来前台渲染，我就得就应该前台渲染减少服务器压力嘛。
然后数据字典我用的链式的replace一直replace。所有地方都用repalace遇到字典项目多了要嵌套了。
能到是能用，但是谁能一眼看得明白呢。后面我就封装了方法到原型上，但是这还不是最好的方法，最好应该是把每个字典都保存
在hash里面，然后封装针对的方法，这样又可以减少很多重复的代码。我的代码封装程度不够，后端也是，我用了大量的db查询。
因为我对模型的操作不是很熟练，直接来说基本没有用到。也没有进行多少封装。
然后微信登录逻辑太差了，我的项目微信登录是拷贝过来的，原来写的跟我的项目有差异，我就没有意识到这点，就在原来的代码上
加加减减的，后面不得不跳出时间来重新整理。
我也会反复纠结一个bug，遇到问题了，我都不第一时间百度问邓文挺。我就在那里调啊调。

- 我的前端同事
要说这个人，技术上给我的感觉就是昨天才学习的前端，今天就来工作了。js她真的是什么也不会，jquery照猫画虎倒是也能搞出来点。
原生基本不会写，也不知道怎么进来的。这个项目在移动端弄的时间是最长了，管理端都是我再弄，早早弄完了。
然后她呢，就搞了html和css还有那个验证，http请求都不会发。她还学过angular？angular可是用的typescript啊，这像吗？
我又要发请求，对数据，写接口，写功能js，渲染页面。这不几乎是我一条龙全包了吗。业务逻辑也一点不懂，页面相加就加，
“你清楚业务逻辑吗？” “我就给她跳那个页面了呀”“那参数呢？”“我哪知道”。然后让她调一下页面。用了art-tempalte渲染的页面。
她真的代码都没去看，没去了解。直接乱改。显示出现问题了，我问怎么改的，那么大个if你没看吗就乱改。“不是你叫我拖上去吗？”
这怎么和她配合嘛。还有就是起点了，选ui框架真的很重要，
我以后真的要和我的队友反复强调了，开始没弄的时候，攀总说让我们用weui。后面我还跟他说有一个mintui，让她看看。我想这是他的工作
后面出什么问题都是找他吧，我真是太不负责了，海。然后呢，做出来了用的原生bootstrap。我看到就想吐了，就像个三四年前的网站，
根本不像个app，这个tab栏风格，我直接都不想做了。我想只要后台弄好就可以了。后面问题全找我啊，可是。然后我就在这堆乱七八糟的东西上改，为什么乱呢，哇塞，这个页面一点都不统一。为什么呢，她写的那个html和css啊，几乎每个div或者span都有一个class，这是做什么呢，
我猜测，虽然我没看过css文件什么样子，一个复合选择器都没用估计。还有就是直接在标签里面写style。js也是，那么多功能相差不大的js。
她要一个一个的写。加载页面时候就是瀑布飞溅。总之这个同事需要补得课太多了，而且她的语气我是真不喜欢。又菜又还理由多。

- 还有一点就是我们没有UI啊，要说有UI早早给设计效果图给客户看，给我看，决定好后我好提前做规划。罗忠秀有个效果图，她估计详尽办法也要弄出来吧，也不会吓搞了个原生bootstrap弄吧，这没有ui不是等于闭着眼睛做？








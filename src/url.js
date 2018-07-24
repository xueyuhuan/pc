export default {
  login:'/security_portal/login',//登录
  getUser:'/user_portal/index',//获取用户信息
  setUserImg:'/security_portal/uploadPhoto',//设置用户头像
  /**
   * 首页
   */
  homePage:'/page_portal/get',//获取工作台布局
  homePageSave:'/page_portal/save_layout',//保存工作台布局
  homeBanner:'/banner_portal/get',//获取轮播图
  //应用
  homeApp:'/app_portal/list_for_widget',//组件-工作台-我的应用
  homeAppAll:'/app_portal/list_setting',//获取所有应用列表
  homeAppHas:'/app_portal/list_user_app',//获取已有应用
  homeAppSave:'/app_portal/save_user_app',//保存应用选择设置
  //服务
  homeService:'/service_portal/list_for_widget',//组件-工作台-服务
  homeServiceAll:'/service_portal/list_for_setting',//获取所有服务列表
  homeServiceType:'/service_portal/list_manage_dept',//获取所有服务类型
  homeServiceSave:'/service_portal/save_user_service',//保存服务设置
  //其他
  homeSchedule:'/calendar_portal/get_events_widget',//获取我的日程
  homeFile:'/gongwen_portal/gongwenList',//组件-工作台-学校公文
  homeNotice:'/notice_portal/noticeList',//组件-工作台-校内通知
  homeNotice2:'/news_portal/news_for_widget',//组件-工作台-通知公告
  homeTodo:'/task_portal/query_todo_all',//组件-工作台-我的待办
  homeUser:'/user_portal/user_center_modules',//组件-工作台-个人中心
  homePay:'/user_portal/salary',//组件-工作台-工资查询
  homeServiceRank:'/service_portal/stat_usertype',//组件-工作台-服务排行
    getTodoCount:'/task_portal/query_todo_count',//待办数
  /**
   * 导航
   */
  /**
   * 服务
   */
  serviceRecommend:'/service_portal/list_recommend',//推荐服务
  serviceHot:'/service_portal/list_hot_for_user',//热门服务
  serviceDeadline:'/service_portal/list_deadline_for_user',//限时办理
  serviceType:'/service_portal/query_service_fwlx',//服务类型（纵向一级目录）
  serviceType2:'/service_portal/query_service_type',//服务类型（横向二级目录）
  serviceList:'/service_portal/list_for_user',//查询具体服务列表
  serviceDetail:'/service_portal/get',//查询具体服务详情
  serviceDetailComment:'/service_portal/get_comments',//查询详情评论
  serviceFWLY:'/service_portal/query_service_type_all',//服务领域
  serviceFZBM:'/service_portal/list_manage_dept',//负责部门
  serviceFWDX:'/service_portal/list_user_group',//服务对象
  serviceSearch:'/service_portal/list',//搜索服务列表
  serviceHotAll:'/service_portal/hot_list',//热门服务（对所有）
  serviceNewest:'/service_portal/newest_list',//最新服务
  /***
   * 设置
   */
  /*我的收藏*/
  componentCollectService:'/service_portal/get_user_favorites',//组件-设置-收藏-服务
  componentCollectApp:'/app_portal/get_user_favorites',//组件-设置-收藏-应用
  componentCollectNews:'/news_portal/getMyNews',//组件-设置-收藏-资讯
  /*我的消息*/
  componentMsgRead:'/msg_portal/query',//已读
  componentMsgUnread:'/msg_portal/query_unread',//未读
  /*办事中心*/
  componentMytodo:'/task_portal/get_apps',

    /**
     * 应用
     */
    list_app_group:'/app_portal/list_app_group',//获取所有类别的app
    get_app_detail:'/app_portal/get',//获取app详情
    app_rank:'/app_portal/list_top',//app排行
    list_app_query:'/app_portal/list_app_query',//应用搜索
    delFavorites:'/user_portal/delFavorites',//取消订阅
    addFavorites:'/user_portal/addFavorites',//订阅
    /**
     * 资讯
     */
    columns_subscribe:'/news_portal/columns_subscribe',//所有已订阅和未订阅的栏目
    news_list:'/news_portal/news_subscribe',//新闻列表
    news_detail:'/news_portal/get',//新闻详情
    cancelNews:'/news_portal/cancelUserNews',//取消订阅
    saveNews:'/news_portal/saveUserNews',//订阅
    rank_news:'/news_portal/rank_news',//阅读排行
    /**
     * 日程
     */
    getCalendarObjs:'/calendar_portal/getCalendarObjs',//获取日历事件的类型，OA/个人日程/校历
    getCalendar:'/calendar_portal/getCalendar',//具体每个日子
    getEvents:'/calendar_portal/get_events_date',//获取该天日程信息
    add_private_event:'/calendar_portal/add_private_event',//添加个人日程
    get_private_event:'/calendar_portal/get_private_event',//修改前先获取某个个人日程
    edit_private_event:'/calendar_portal/edit_private_event',//编辑个人日程
    remove_private_events:'/calendar_portal/remove_private_events',//删除个人日程
    get_cals_sub:'/calendar_portal/get_cals_sub',//获取日程订阅所有栏目
    saveUserCalendar:'/calendar_portal/saveUserCalendar',//订阅
    cancelUserCalendar:'/calendar_portal/cancelUserCalendar',//取消订阅
    subscription_private:'/calendar_portal/subscription_private',//手机二维码
    /**
     * 待办
     */
    getTodoResource:'/task_portal/get_apps',//待办来源
    //哈工大
    getSelect:'/task_portal/get_myStarted_apps',//我发起的-来源备选项
    //我的已办
    get_myDone_apps:'/task_portal/get_myDone_apps',//拿左侧来源下拉框备选项
    query_done:'/task_portal/query_done',//明细
  //我发起的
  get_myStarted_apps:'/task_portal/get_myStarted_apps',//拿左侧条件
  query_myStarted:'/task_portal/query_myStarted',//拿右侧明细
    /**
     * 收藏
     */
    collectionService:'/service_portal/get_user_favorites',//服务
    collectionApp:'/app_portal/get_user_favorites',//应用
    collectionNews:'/news_portal/getMyNews',//新闻
    /**
     * 消息中心
     */
    query_unread:'/msg_portal/query_unread',//未读
    query:'/msg_portal/query',//全部消息
    set_read:'/msg_portal/set_read',//将未读消息标识为已读
    msgDetail:'/msg_portal/detail',//获取消息详情
    set_read_all:'/msg_portal/set_read_all',//将消息全部标记为已读
}
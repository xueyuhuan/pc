export default {
  login:'/security_portal/login',//登录
  getUser:'/user_portal/index',//获取用户信息
  /**
   * 首页
   */
  homePage:'/page_portal/get',//获取工作台布局
  homeBanner:'/banner_portal/get',//获取轮播图
  homeApp:'/app_portal/list_for_widget',//组件-工作台-我的应用
  homeFile:'/gongwen_portal/gongwenList',//组件-工作台-学校公文
  homeService:'/service_portal/list_for_widget',//组件-工作台-服务
  homeSchedule:'/calendar_portal/get_events_widget',//获取我的日程
  homeNotice:'/notice_portal/noticeList',//组件-工作台-校内通知
  homeNotice2:'/news_portal/news_for_widget',//组件-工作台-通知公告
  homeTodo:'/task_portal/query_todo_all',//组件-工作台-我的待办
  homeUser:'/user_portal/user_center_modules',//组件-工作台-个人中心
  homePay:'/user_portal/salary',//组件-工作台-工资查询
  homeServiceRank:'/service_portal/stat_usertype',//组件-工作台-服务排行
  /**
   * 导航
   */
  /*日程*/
  componentCalendar:'/calendar_portal/getCalendar',
  componentCalendarEvents:'/calendar_portal/get_events_date',
  /*服务*/
  componentServiceCenter_fwly:'/service_portal/query_service_type_all',//服务领域
  componentServiceCenter_fzbm:'/service_portal/list_manage_dept',//负责部门
  componentServiceCenter_fwdx:'/service_portal/list_user_group',//服务对象
  componentServiceCenter_list:'/service_portal/list',//拉取列表
  /*应用*/
  componentAppCenter:'/app_portal/list_app_group',
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
    delFavorites:'/user_portal/delFavorites',//取消订阅
    addFavorites:'/user_portal/addFavorites',//订阅
    /**
     * 资讯
     */
    columns_subscribe:'/news_portal/columns_subscribe',//所有已订阅和未订阅的栏目
    news_list:'/news_portal/news_subscribe',//新闻列表及其详情
}
// @ts-nocheck
/// ARCOS GLOBAL TYPE DEFINITIONS
///
/// This file contains errors. I know. The important thing is that all relevant types
/// are detected and processed properly. Don't worry about it.
///
/// © IzKuipers 2025. Licensed under GPLv3.
///

declare global {
  export type DispatchCallback = (...args: any[]) => any;

  export type SystemDispatchResult = "success" | "err_systemOnly" | "err_unknownCaller";

  export interface GlobalDispatchClient {
      socketId: string;
      userId: string;
      authorized: boolean;
      ip?: string;
  }

  export interface ProcessContext {
      pid: number;
      userId: string | "SYSTEM";
      appId?: string;
  }

  export type RenderArgs = Record<string, any>;

  export type ProcessSpawnResult = "success" | "err_disabled" | "err_aboveLimit";

  export type ProcessKillResult = "success" | "err_elevation" | "err_criticalProcess" | "err_disposed" | "err_noExist" | "err_killCancel";

  export const ProcessStates: readonly [
      "starting",
      "running",
      "stopping",
      "error",
      "constructing",
      "unknown",
      "disposed",
      "rendering"
  ];

  export type ProcessState = (typeof ProcessStates)[number];

  export const ProcessStateIcons: Record<ProcessState, string>;

  export interface IProcess {
      dispatch: IProcessDispatch;
      pid: number;
      parentPid: number;
      name: string;
      get _disposed(): boolean;
      _criticalProcess: boolean;
      sourceUrl: string;
      STATE: ProcessState;
      get MEMORY(): number;
      __start(): Promise<any>;
      __stop(): Promise<any>;
      killSelf(): Promise<void>;
      requestFileLock(path: string): Promise<false | undefined>;
      unlockFile(path: string): Promise<false | undefined>;
      setSource(source: string): void;
  }

  export interface IProcessDispatch {
      subscribe(event: string, callback: DispatchCallback): void;
      dispatch(event: string, ...args: any[]): Promise<boolean>;
  }

  export interface AppKeyCombination {
      alt?: boolean;
      ctrl?: boolean;
      shift?: boolean;
      key?: string;
      action(proc: any, event: KeyboardEvent): void;
      global?: boolean;
  }

  export type AppKeyCombinations = AppKeyCombination[];

  export type MaybePromise<T> = T | Promise<T>;

  export type IntBool = 1 | 0;

  export interface UserTheme {
      author: string;
      version: string;
      name: string;
      taskbarLabels: boolean;
      taskbarDocked: boolean;
      taskbarColored: boolean;
      noAnimations: boolean;
      sharpCorners: boolean;
      compactContext: boolean;
      noGlass: boolean;
      desktopWallpaper: string;
      desktopTheme: string;
      desktopAccent: string;
      loginBackground?: string;
  }

  export type UserThemeNoMeta = Omit<Omit<Omit<UserTheme, "author">, "version">, "name">;

  export type ThemeStore = {
      [key: string]: UserTheme;
  };

  export const UserThemeKeys: string[];

  export interface Wallpaper {
      author: string;
      name: string;
      source?: string;
      url: string;
      thumb: string;
      builtin?: boolean;
  }

  export type Subscriber<T> = (value: T) => void;

  export type Unsubscriber = () => void;

  export type Updater<T> = (value: T) => T;

  export interface Readable<T> {
      subscribe(this: void, run: Subscriber<T>, invalidate?: () => void): Unsubscriber;
  }

  export interface Writable<T> extends Readable<T> {
      set(this: void, value: T): void;
      update(this: void, updater: Updater<T>): void;
  }

  export type ReadableStore<T> = Writable<T> & {
      (): T;
      get: () => T;
  };

  export type BooleanStore = ReadableStore<boolean>;

  export type StringStore = ReadableStore<string>;

  export type NumberStore = ReadableStore<number>;

  export interface UserInfo {
      username: string;
      preferences: UserPreferences;
      admin: boolean;
      adminScopes: string[];
      approved: boolean;
      _id: string;
      email: string;
      updatedAt: string;
      createdAt: string;
      hasTotp: boolean;
      restricted: boolean;
      storageSize: number;
  }

  export type UserPreferencesStore = ReadableStore<UserPreferences>;

  export interface UserPreferences {
      shell: ShellPreferences;
      security: SecurityPreferences;
      appPreferences: ApplicationPreferences;
      account: AccountSettings;
      isDefault?: boolean;
      firstRunDone?: boolean;
      desktop: DesktopPreferences;
      userThemes: ThemeStore;
      userWallpapers: Record<string, Wallpaper>;
      userApps: Record<string, App>;
      currentThemeId?: string;
      searchOptions: ArcFindOptions;
      pinnedApps: string[];
      disabledApps: string[];
      workspaces: WorkspacesOptions;
      globalSettings: Record<string, any>;
      startup?: Record<string, "app" | "file" | "folder" | "share" | "disabled">;
      _internalImportBlocklist: string[];
      enableVerboseLogin?: boolean;
  }

  export type ExpandedUserInfo = UserInfo & {
      profile: PublicUserInfo;
  };

  export interface WorkspacesOptions {
      desktops: Workspace[];
      index: number;
  }

  export interface Workspace {
      name?: string;
      uuid: string;
  }

  export interface ArcFindOptions {
      includeFilesystem: boolean;
      includeSettingsPages: boolean;
      includeApps: boolean;
      includePower: boolean;
      cacheFilesystem: boolean;
      showHiddenApps: boolean;
      showThirdPartyApps: boolean;
      excludeShortcuts: boolean;
  }

  export interface CustomStylePreferences {
      enabled: boolean;
      content?: string;
  }

  export interface ShellPreferences {
      taskbar: TaskbarPreferences;
      start: StartMenuPreferences;
      visuals: VisualPreferences;
      customStyle: CustomStylePreferences;
      actionCenter: {
          weatherLocation: {
              latitude: number;
              longitude: number;
              name?: string;
          };
          noteContent: string;
          galleryImage: string;
          cardIndex: number;
          hideQuickSettings: boolean;
      };
  }

  export interface TaskbarPreferences {
      labels: boolean;
      docked: boolean;
      colored: boolean;
      clockSecs: boolean;
      clockDate: boolean;
      clock12hr: boolean;
      batteryPercentage: boolean;
      openedAppsPerWorkspace?: boolean;
  }

  export interface DesktopPreferences {
      wallpaper: string;
      icons: boolean;
      theme: "light" | "dark" | string;
      sharp: boolean;
      accent: string;
      noIconGrid: boolean;
      lockIcons: boolean;
      nativeNotificationsState?: NotificationPermission;
  }

  export interface StartMenuPreferences {
      noGroups: boolean;
      actions: string[];
  }

  export interface VisualPreferences {
      noAnimations: boolean;
      sharpCorners: boolean;
      compactContext: boolean;
      showHiddenApps: boolean;
      noGlass: boolean;
      userFont?: string;
      trafficLights: boolean;
      blurRadius: number;
      hideAltmenus?: boolean;
  }

  export interface SecurityPreferences {
      lockdown: boolean;
      noPassword: boolean;
      disabled: boolean;
      enableThirdParty: boolean;
      restrictSystemFolders: boolean;
  }

  export interface AccountSettings {
      profilePicture: string | number | null;
      loginBackground: string;
      displayName?: string;
  }

  export interface ApplicationPreferences {
      experiments: {
          [key: string]: boolean;
      };
      [key: string]: ScopedAppData;
  }

  export type ScopedAppData = {
      [key: string]: any;
  };

  export type WallpaperGetters = [
      string,
      (id: string) => Wallpaper | Promise<Wallpaper>
  ][];

  export type PasswordStrength = "tooWeak" | "weak" | "medium" | "strong";

  export const PasswordStrengthCaptions: Record<PasswordStrength, string>;

  export interface PublicUserInfo {
      username: string;
      displayName?: string;
      profilePicture: string;
      admin: boolean;
      dispatchClients: number;
  }

  export interface CategorizedDiskUsage {
      sizes: {
          system: number;
          trash: number;
          home: number;
          apps: number;
      };
      absolutePercentages: {
          system: number;
          trash: number;
          home: number;
          apps: number;
      };
      relativePercentages: {
          system: number;
          trash: number;
          home: number;
          apps: number;
      };
      used: number;
      free: number;
      total: number;
  }

  export interface CommandResultOptions {
      errorMessage?: string;
      successMessage?: string;
      success?: boolean;
  }

  export const DefaultCommandResultOptions: CommandResultOptions;

  export interface Constructs<T, R extends Array<unknown> = any[]> {
      new (...args: R): T;
  }

  export interface ICommandResult<T = string> {
      result: T | undefined;
      error?: Error;
      errorMessage?: string;
      successMessage?: string;
      success: boolean;
  }

  export interface ICommandResultConstructor extends Constructs<ICommandResult> {
      Ok<T>(value: T, successMessage?: string): ICommandResult<T>;
      Error<T = any>(errorMessage: string): ICommandResult<T>;
      new <T>(result?: T, options?: CommandResultOptions): ICommandResult<T>;
  }

  export interface IAccountUserContext extends IUserContext {
      discontinueToken(token?: string): Promise<boolean | undefined>;
      getUserInfo(): Promise<UserInfo | undefined>;
      changeUsername(newUsername: string): Promise<boolean>;
      changePassword(newPassword: string): Promise<boolean>;
      getPublicUserInfoOf(userId: string): Promise<PublicUserInfo | undefined>;
      deleteAccount(): Promise<void>;
  }

  export interface LoginActivity {
      authorId: string;
      token?: string;
      userAgent: string;
      location?: Location;
      action: "unknown" | "login" | "logout";
      _id: string;
      createdAt: string;
      updatedAt: string;
  }

  export interface ILoginActivityUserContext extends IUserContext {
      getLoginActivity(): Promise<LoginActivity[]>;
      logActivity(action: string): Promise<boolean>;
  }

  export interface IAppRegistrationUserContext extends IUserContext {
      getUserApps(): Promise<AppStorage>;
      registerApp(data: InstalledApp): Promise<void>;
      uninstallPackageWithStatus(id: string, deleteFiles?: boolean): Promise<boolean>;
      registerAppFromPath(path: string): Promise<"failed to read file" | "failed to convert to JSON" | "missing properties" | undefined>;
      uninstallAppWithAck(app: App): Promise<boolean>;
      pinApp(appId: string): Promise<void>;
      unpinApp(appId: string): void;
      determineStartMenuShortcutPath(app: App): string | undefined;
      addToStartMenu(appId: string): Promise<void>;
      removeFromStartMenu(appId: string): Promise<void>;
      updateStartMenuFolder(quiet?: boolean): Promise<void>;
      modeUserAppsToFs(): Promise<void>;
  }

  export interface IApplicationsUserContext extends IUserContext {
      spawnAutoload(): Promise<void>;
      checkDisabled(appId: string, noSafeMode?: boolean): boolean;
      isVital(app: App): boolean | undefined;
      isPopulatableByAppIdSync(appId: string): boolean;
      disableApp(appId: string): Promise<false | undefined>;
      enableApp(appId: string): Promise<false | undefined>;
      enableThirdParty(): Promise<void>;
      disableThirdParty(): Promise<void>;
  }

  export interface IChecksUserContext extends IUserContext {
      NIGHTLY: boolean;
      checkReducedMotion(): void;
      checkForUpdates(): Promise<void>;
      checkForMissedMessages(): Promise<void>;
      checkNightly(): void;
  }

  export interface ElevationData {
      what: string;
      image: string;
      title: string;
      description: string;
      level: ElevationLevel;
  }

  export enum ElevationLevel {
      low = 0,
      medium = 1,
      high = 2
  }

  export interface IElevationUserContext extends IUserContext {
      _elevating: boolean;
      elevate(id: string): Promise<unknown>;
      manuallyElevate(data: ElevationData): Promise<unknown>;
      loadElevation(id: string, data: ElevationData): void;
  }

  export interface WeatherMeta {
      caption: string;
      iconColor: string;
      icon: string;
      gradient: {
          start: string;
          end: string;
      };
  }

  export type WeatherInformation = {
      temperature: number;
      condition: string;
      code: number;
      className: string;
      gradient: {
          start: string;
          end: string;
      } | undefined;
      icon: string;
      iconColor: string;
      isNight: boolean;
  } | false;

  export interface ShellTrayIcon {
      pid: number;
      identifier: string;
      popup?: TrayPopup;
      icon: string;
      context?: ContextMenuItem[];
      action?: (targetedProcess: IProcess) => void;
  }

  export interface TrayIconOptions {
      popup?: TrayPopup;
      icon: string;
      context?: ContextMenuItem[];
      action?: (targetedProcess: IProcess) => void;
  }

  export interface TrayPopup {
      component?: Component;
      width: number;
      height: number;
      className?: string;
  }

  export interface QuickSetting {
      isActive: (process: IShellRuntime) => boolean | Promise<boolean>;
      action: (process: IShellRuntime) => any;
      icon: string;
      className?: string;
      caption: string;
  }

  export type TrayIconDiscriminator = `${number}#${string}`;

  export interface CalendarMonth {
      prepended: CalendarDay[];
      current: CalendarDay[];
      appended: CalendarDay[];
  }

  export interface CalendarDay {
      fullDate: string;
      caption: string;
      dayOfMonth: number;
      isToday?: boolean;
  }

  export const longWeekDays: string[];

  export const shortWeekDays: string[];

  export interface StartMenuAction {
      caption: string;
      icon: string;
      action: (process: IShellRuntime) => void;
      className?: string;
  }

  export interface LogItem {
      source: string;
      message: string;
      timestamp: number;
      level: LogLevel;
      kernelTime: number;
  }

  export enum LogLevel {
      info = 0,
      warning = 1,
      error = 2,
      critical = 3
  }

  export const LogLevelCaptions: Record<LogLevel, string>;

  export const ShortLogLevelCaptions: Record<LogLevel, string>;

  export interface ServerInfo {
      validation: string;
      status: string;
      loginWallpaper: boolean;
      loginBottomText: string;
      loginNotice: string;
      disableRegistration: boolean;
      freshBackend: boolean;
      rejectTargetedAuthorization: boolean;
      noEmailVerify: boolean;
  }

  export interface ServerOption {
      url: string;
      authCode?: string;
      name?: string;
      system?: boolean;
      icon?: string;
  }

  export interface IServerManager {
      connected: boolean;
      serverInfo?: ServerInfo;
      previewBranch?: string;
      servers: ServerOption[];
      url?: string;
      authCode?: string;
      checkUsernameAvailability(username: string): Promise<boolean>;
      checkEmailAvailability(username: string): Promise<boolean>;
      switchServer(url: string): Promise<boolean>;
      loadServers(): void;
      writeServers(servers: ServerOption[]): void;
      resetServers(): void;
      addServer(config: ServerOption): boolean;
      removeServer(url: string): boolean;
      isAdded(url: string): boolean;
  }

  export interface IFilesystemDrive {
      server: IServerManager;
      driveLetter: string | undefined;
      label: string;
      uuid: string;
      readonly FIXED: boolean;
      readonly REMOVABLE: boolean;
      readonly READONLY: boolean;
      readonly HIDDEN: boolean;
      readonly IDENTIFIES_AS: string;
      readonly FILESYSTEM_SHORT: string;
      readonly FILESYSTEM_LONG: string;
      BUSY: boolean;
      Log(message: string, level?: LogLevel): void;
      lockFile(path: string, pid: number): Promise<void>;
      releaseLock(path: string, pid: number, fromSystem?: boolean): Promise<void>;
      __spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      __spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      direct(path: string): Promise<string | undefined>;
      quota(): Promise<UserQuota>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      stat(path: string): Promise<FilesystemStat | undefined>;
      isCapable(capability: DriveCapabilities): void;
      tryIsCapable(capability: DriveCapabilities): boolean;
      imageThumbnail(path: string, width: number, height?: number): Promise<string | undefined>;
  }

  export interface IFilesystemProxy {
      uuid: string;
      readonly displayName?: string;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
  }

  export interface IFilesystemProxyConstructor extends Constructs<IFilesystemProxy, [
      string
  ]> {
      PROXY_UUID: string;
  }

  export interface ArcShortcut {
      icon: string;
      name: string;
      type: "folder" | "file" | "app" | "new";
      target: string;
  }

  export type ShortcutStore = Record<string, ArcShortcut>;

  export interface FileEntry {
      name: string;
      size: number;
      dateCreated: Date;
      dateModified: Date;
      mimeType: string;
      itemId: string;
      shortcut?: ArcShortcut;
      action?: () => void;
      modifiers?: SummarizedFsModifiers;
  }

  export interface FsAccess {
      _id?: string;
      userId: string;
      shareId?: string;
      path: string;
      accessor: string;
      createdAt?: Date;
  }

  export type PathedFileEntry = FileEntry & {
      path: string;
  };

  export type FullFileEntry = FileEntry & {
      data: Blob;
  };

  export interface FolderEntry {
      name: string;
      dateCreated: Date;
      dateModified: Date;
      itemId: string;
      modifiers?: SummarizedFsModifiers;
  }

  export interface DirectoryReadReturn {
      dirs: FolderEntry[];
      files: FileEntry[];
      totalFiles: number;
      totalFolders: number;
      totalSize: number;
      shortcuts: ShortcutStore;
  }

  export interface RecursiveDirectoryReadReturn {
      dirs: RecursiveDirectory[];
      files: FileEntry[];
      shortcuts: ShortcutStore;
  }

  export type RecursiveDirectory = FolderEntry & {
      children: RecursiveDirectoryReadReturn;
  };

  export interface UserQuota extends Record<string, number | boolean | undefined> {
      used: number;
      max: number;
      free: number;
      percentage: number;
      unknown?: boolean;
  }

  export const DefaultUserQuota: UserQuota;

  export interface SingleUploadReturn {
      path: string;
      file: File;
      content: Blob;
  }

  export type UploadReturn = SingleUploadReturn[];

  export interface FilesystemProgress {
      type: "size" | "items" | "percentage";
      max: number;
      value: number;
      what?: string;
  }

  export type FilesystemProgressCallback = (progress: FilesystemProgress) => void;

  export interface FileHandler {
      isHandler: true;
      name: string;
      description: string;
      icon: string;
      hidden?: boolean;
      opens: {
          extensions?: string[];
          mimetypes?: string[];
      };
      handle: (path: string) => void;
  }

  export interface FileOpenerResult {
      type: "handler" | "app";
      app?: App;
      handler?: FileHandler;
      id: string;
  }

  export type DriveCapabilities = "readDir" | "makeDir" | "readFile" | "writeFile" | "tree" | "copyItem" | "moveItem" | "deleteItem" | "direct" | "quota" | "bulk" | "stat";

  export interface FilesystemStat {
      isFile: boolean;
      isDirectory: boolean;
      size: number;
      created: number;
      modified: number;
  }

  export interface FsModifier {
      _id?: string;
      userId: string;
      itemId: string;
      kind: FsModifierKind;
      isAdmin?: boolean;
      isDir?: boolean;
      createdAt?: string;
      modifiedAt?: string;
  }

  export interface ExtendedFsModifier extends FsModifier {
      user?: PublicUserInfo;
  }

  export interface SummarizedFsModifiers {
      itemId: string;
      lastWrite: ExtendedFsModifier | null;
      createdBy: ExtendedFsModifier | null;
  }

  export type FsModifierKind = "create" | "write";

  export interface FsModifierOptions {
      kind: FsModifierKind;
      isAdmin?: boolean;
      isDir?: boolean;
  }

  export interface ExtendedStat extends FilesystemStat {
      modifiers?: SummarizedFsModifiers;
  }

  export interface FsProxyInfo {
      prefix: string;
      proxyUuid: string;
      proxyHandler: IFilesystemProxy;
      path: string;
      displayName?: string;
  }

  export interface SearchItem {
      caption: string;
      action: (item?: SearchItem) => void;
      image?: string;
      description?: string;
  }

  export type SearchProvider = () => Promise<SearchItem[]> | SearchItem[];

  export interface IArcFindRuntime extends IAppProcess {
      loading: ReadableStore<boolean>;
      start(): Promise<false | undefined>;
      stop(): Promise<void>;
      refresh(): Promise<SearchItem[] | undefined>;
      getFilesystemSearchSupplier(preferences: UserPreferences): Promise<SearchItem[]>;
      getAppSearchSupplier(preferences: UserPreferences): Promise<SearchItem[]>;
      getFlatTree(): Promise<PathedFileEntry[]>;
      Search(query: string): Promise<{
          id: string;
          item: SearchItem;
          refIndex: number;
          score?: number;
          matches?: ReadonlyArray<FuseResultMatch>;
      }[]>;
  }

  export interface IShellRuntime extends IAppProcess {
      startMenuOpened: ReadableStore<boolean>;
      actionCenterOpened: ReadableStore<boolean>;
      workspaceManagerOpened: ReadableStore<boolean>;
      calendarOpened: ReadableStore<boolean>;
      stackBusy: ReadableStore<boolean>;
      searchQuery: ReadableStore<string>;
      searchResults: ReadableStore<FuseResult<SearchItem>[]>;
      searching: ReadableStore<boolean>;
      SelectionIndex: ReadableStore<number>;
      FullscreenCount: ReadableStore<Record<string, Set<number>>>;
      openedTrayPopup: ReadableStore<string>;
      searchLoading: ReadableStore<boolean>;
      trayHost?: ITrayHostRuntime;
      arcFind?: IArcFindRuntime;
      ready: ReadableStore<boolean>;
      STARTMENU_FOLDER: string;
      StartMenuContents: ReadableStore<RecursiveDirectoryReadReturn>;
      contextMenu: AppContextMenu;
      selectedAppGroup: ReadableStore<string>;
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      stop(): Promise<boolean>;
      gotReadySignal(): Promise<void>;
      pinApp(appId: string): Promise<void>;
      unpinApp(appId: string): void;
      deleteWorkspace(workspace: Workspace): Promise<void>;
      MutateIndex(e: KeyboardEvent): void | -1;
      Trigger(result: SearchItem): Promise<void>;
      Submit(): void;
      refreshStartMenu(): Promise<void>;
      getCalendarMonth(date?: string): CalendarMonth;
      getWeather(): Promise<WeatherInformation>;
      exit(): Promise<void>;
      changeShell(id: string): Promise<false | undefined>;
  }

  export interface ITrayHostRuntime extends IProcess {
      userPreferences?: UserPreferencesStore;
      trayIcons: ReadableStore<Record<`${number}#${string}`, ITrayIconProcess>>;
      start(): Promise<false | undefined>;
      createTrayIcon(pid: number, identifier: string, options: TrayIconOptions, process?: Constructs<IProcess>): Promise<boolean>;
      disposeTrayIcon(pid: number, identifier: string): Promise<false | undefined>;
      disposeProcessTrayIcons(pid: number): void;
  }

  export interface ITrayIconProcess extends IProcess {
      targetPid: number;
      identifier: string;
      popup?: TrayPopup;
      context?: ContextMenuItem[];
      action?: (targetedProcess: IProcess) => void;
      componentMount: Record<string, any>;
      icon: string;
      shell: IShellRuntime;
      __render(): Promise<void>;
      stop(): Promise<void>;
      renderPopup(popup: HTMLDivElement, target: IProcess): Promise<void>;
      getPopupBody(): Element | null;
  }

  export interface GlobalLoadIndicatorProgress {
      max: number;
      value: number;
      useHtml?: boolean;
  }

  export interface IconPickerData {
      forWhat: string;
      defaultIcon: string;
      returnId: string;
  }

  export interface BugReport {
      authorId?: string;
      title: string;
      body: string;
      logs: LogItem[];
      closed: boolean;
      version: `${number}.${number}.${number}`;
      location: Location;
      userData?: Record<string, any>;
      userAgent?: string;
      api?: string;
      frontend: string;
      meta: MetaEnvironment;
      env: Record<string, string>;
      _id?: string;
      createdAt: string;
      mode: string;
      build: string;
      public: boolean;
      isAppReport?: boolean;
      reportAppId?: string;
      reportAppPkgId?: string;
  }

  export interface OutgoingBugReport {
      title: string;
      body: string;
      logs: LogItem[];
      version: `${number}.${number}.${number}`;
      location: Location;
      userAgent?: string;
      api?: string;
      frontend: string;
      meta: MetaEnvironment;
      mode: string;
      build: string;
      public?: boolean;
      isAppReport?: boolean;
      reportAppId?: string;
      reportAppPkgId?: string;
  }

  export interface Location {
      hash: string;
      host: string;
      hostname: string;
      href: string;
      origin: string;
      pathname: string;
      port: string;
      protocol: string;
      search: string;
  }

  export interface MetaEnvironment {
      BASE_URL: string;
      MODE: string;
      DEV: boolean;
      PROD: boolean;
      SSR: boolean;
      DW_SERVER_URL?: string;
      DW_SERVER_AUTHCODE?: string;
  }

  export interface ReportStatistics extends Record<string, number> {
      opened: number;
      closed: number;
      total: number;
      apis: number;
  }

  export interface ReportOptions {
      title: string;
      body?: string;
      noLogs?: boolean;
      anonymous?: boolean;
      public?: boolean;
  }

  export interface BugHuntProc extends IAppProcess {
      invalidateCaches: (restoreSelected?: boolean) => Promise<void>;
  }

  export interface IBugHunt {
      _init(): Promise<void>;
      createReport(options?: ReportOptions, app?: App, storeItemId?: string): OutgoingBugReport;
      sendReport(outgoing: OutgoingBugReport, token?: string, options?: ReportOptions): Promise<boolean>;
      getToken(): string;
      getUserBugReports(token: string): Promise<BugReport[]>;
      getPublicBugReports(): Promise<BugReport[]>;
  }

  export interface ISystemDispatch {
      subscribers: Record<string, Record<number, (data: any) => void>>;
      subscribe<T = any[]>(event: string, callback: (data: T) => void): number;
      unsubscribeId(event: string, id: number): void;
      discardEvent(event: string): void;
      dispatch<T = any[]>(caller: string, data?: T, system?: boolean): SystemDispatchResult;
  }

  export interface IEnvironment {
      _init(): Promise<void>;
      delete(key: string): boolean;
      get(key: string): any;
      getMultiple(keys: string[]): any[];
      getAll(): Record<string, string>;
      setReadonly(key: string): void;
      setWritable(key: string): void;
      set(key: string, value: any): boolean;
      setMultiple(entries: [
          string,
          any
      ][]): void;
      reset(): void;
  }

  export interface IFilesystem {
      drives: Record<string, IFilesystemDrive>;
      loadedProxies: IFilesystemProxy[];
      _init(): Promise<void>;
      getDriveById(id: string): IFilesystemDrive;
      mountDrive<T extends IFilesystemDrive = IFilesystemDrive>(id: string, supplier: Constructs<IFilesystemDrive>, letter?: string, onProgress?: FilesystemProgressCallback, ...args: any[]): Promise<T | false>;
      getDriveIdByIdentifier(identifier: string): string;
      umountDrive(id: string, fromSystem?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      getDriveByLetter(letter: string, error?: boolean): IFilesystemDrive;
      getDriveIdentifier(path: string): string;
      getDriveByPath(path: string): IFilesystemDrive;
      validatePath(p: string): void;
      removeDriveLetter(p: string): string;
      validateDriveLetter(letter: string): void;
      getProxyInfo(p: string, topLevel?: boolean): FsProxyInfo | undefined;
      tryGetProxyInfo(p: string, topLevel?: boolean): FsProxyInfo | undefined;
      tryHandleProxyReadDir(p: string): Promise<DirectoryReadReturn | undefined>;
      tryHandleProxyReadFile(p: string): Promise<ArrayBuffer | undefined>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      createDirectory(path: string, dispatch?: boolean): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback, dispatch?: boolean): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      moveItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      deleteItem(path: string, dispatch?: boolean): Promise<boolean>;
      uploadFiles(target: string, accept?: string, multiple?: boolean, onProgress?: FilesystemProgressCallback): Promise<UploadReturn>;
      defaultProgress(d: FilesystemProgress): void;
      lockFile(path: string, pid: number): Promise<void>;
      releaseLock(path: string, pid: number): Promise<void>;
      direct(path: string): Promise<string | undefined>;
      nextAvailableDriveLetter(): string | undefined;
      isDirectory(path: string): Promise<false | DirectoryReadReturn>;
      stat(path: string): Promise<ExtendedStat | undefined>;
      imageThumbnail(path: string, width: number, height?: number): Promise<string | undefined>;
  }

  export interface ISoundbus {
      playSound(id: string, volume?: number): boolean | undefined;
      stopSound(id: string): boolean;
      getStore(): [
          string,
          string
      ][];
      loadExternal(source: string, play?: boolean): void;
  }

  export interface IAppRenderer extends IProcess {
      currentState: number[];
      target: HTMLDivElement;
      maxZIndex: number;
      focusedPid: ReadableStore<number>;
      appStore: ReadableStore<Map<string, AppProcessData>>;
      lastInteract?: IAppProcess;
      _criticalProcess: boolean;
      disposedCheck(): void;
      render(process: IAppProcess, renderTarget: HTMLDivElement | undefined): Promise<void>;
      _windowClasses(proc: IAppProcess, window: HTMLDivElement, data: App): void;
      _windowEvents(proc: IAppProcess, window: HTMLDivElement, titlebar: HTMLDivElement | undefined, data: App): void;
      focusPid(pid: number): void;
      _renderTitlebar(process: IAppProcess): HTMLDivElement | undefined;
      _renderAltMenu(process: IAppProcess): HTMLDivElement;
      _resizeGrabbers(process: IAppProcess, window: HTMLDivElement): undefined;
      _resizer(window: HTMLDivElement, resizer: WindowResizer): HTMLDivElement;
      remove(pid: number): Promise<void>;
      toggleMaximize(pid: number): void;
      updateDraggableDisabledState(pid: number, window: HTMLDivElement): void;
      unMinimize(pid: number): void;
      unsnapWindow(pid: number, dispatch?: boolean): void;
      snapWindow(pid: number, variant: string): void;
      toggleMinimize(pid: number): void;
      toggleFullscreen(pid: number): void;
      getAppInstances(id: string, originPid?: number): IAppProcess[];
      notifyCrash(data: App, reason: any, process?: IAppProcess): Promise<void>;
  }

  export interface IProcessHandler {
      BUSY: string;
      IS_BUSY: boolean;
      get MEMORY(): number;
      store: ReadableStore<Map<number, IProcess>>;
      rendererPid: number;
      renderer: IAppRenderer | undefined;
      _init(): Promise<void>;
      startRenderer(initPid: number): Promise<void>;
      spawn<T extends IProcess = IProcess>(process: Constructs<T>, renderTarget?: HTMLDivElement | undefined, userId?: string, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      kill(pid: number, force?: boolean): Promise<ProcessKillResult>;
      _killSubProceses(pid: number, force?: boolean): Promise<void>;
      getSubProcesses(parentPid: number): Map<number, IProcess>;
      getProcess<T = IProcess>(pid: number, disposedToo?: boolean): T | undefined;
      getPid(): number;
      isPid(pid: number): boolean;
      ConnectDispatch(pid: number): IProcessDispatch | undefined;
      waitForAvailable(or?: string): Promise<void>;
      getProcessContext(pid: number): ProcessContext | undefined;
  }

  export type AppModuleLoader = () => Promise<{
      default: App;
  }>;

  export interface State {
      render?: (props: Record<string, any>, accessors: StateRendererAccessors) => Promise<any>;
      appModule?: AppModuleLoader;
      html?: string;
      name: string;
      identifier: string;
  }

  export interface StateRendererAccessors {
      state: IStateHandler;
  }

  export type StateProps = Record<string, any>;

  export interface IStateHandler extends IProcess {
      store: Record<string, State>;
      currentState: string;
      stateProps: Record<string, Record<any, any>>;
      stateAppProcess: IAppProcess | undefined;
      _criticalProcess: boolean;
      start(): Promise<void>;
      loadState(id: string, props?: Record<string, any>, instant?: boolean): Promise<void>;
      loadStateNormally(id: string, data: State, htmlLoader: HTMLDivElement, cssLoader: HTMLLinkElement): Promise<void>;
      loadStateAsApp(data: State, props: Record<string, any>): Promise<void>;
      getStateLoaders(): {
          htmlLoader: HTMLDivElement;
          cssLoader: HTMLLinkElement;
          main: HTMLDivElement;
      };
  }

  export const ArcOSVersion: `${number}.${number}.${number}`;

  export const BETA = true;

  export const USERFS_UUID = "233D-CE74-18C0-0B08";

  export let Kernel: IWaveKernel;

  export let Fs: IFilesystem;

  export let Env: IEnvironment;

  export let Stack: IProcessHandler;

  export let Server: IServerManager;

  export let SysDispatch: ISystemDispatch;

  export let SoundBus: ISoundbus;

  export let State: IStateHandler;

  export let BugHunt: IBugHunt;

  export function SetCurrentKernel(kernel: IWaveKernel): void;

  export function SetCurrentStateHandler(state: IStateHandler): void;

  export function SetKernelExports(): void;

  export function getKMod<T = any>(id: string, dontCrash?: boolean): T;

  export function Log(source: string, message: string, level?: LogLevel): void;

  export function getAllJsonPaths(obj: any, prefix?: string): string[];

  export function getJsonHierarchy<T = any>(object: Object, hierarchy: string): T | null;

  export function setJsonHierarchy<T = any>(object: Object, hierarchy: string, value: any): T | null;

  export type NestedObject = Record<string, any>;

  export function applyDefaults<T = NestedObject>(target: NestedObject, defaults: NestedObject): T;

  export function validateUsername(username: string): boolean;

  export function htmlspecialchars(text: string): string;

  export function detectJavaScript(htmlString: string): string[] | null;

  export const validateEmail: (email: string) => RegExpMatchArray | null;

  export function checkPasswordStrength(password: string): Result<string>;

  export const Plural: (s: string, x: number) => string;

  export function sliceIntoChunks(arr: any[], chunkSize: number): any[][];

  export const decimalToHex: (value: number, maxLength?: number) => string;

  export function sha256(message: string): Promise<string>;

  export function CountInstances(input: string, search: string): number;

  export const maxLength: (m: string[], padding?: number) => number;

  export const Truncate: (s: string, m: number) => string;

  export const FormatLargeNumber: (n: number) => string;

  export const Gap: (n: number, s?: string) => string;

  export function tryParseInt(input: any, returnsUndefined?: boolean): any;

  export function sortByKey<T extends any[]>(array: T, key: string, reverse?: boolean): T;

  export function sortByHierarchy(array: any[], hierarchy: string): any[];

  export function deepCopyWithBlobs<T>(obj: T): Promise<T>;

  export function authcode(): string;

  export function groupByTimeFrame<T extends Record<string, any>>(items: T[], column?: keyof T): Record<string, T[]>;

  export function noop(): void;

  export function calculateMemory(process: IProcess): number;

  export function stringifyProcess(obj: IProcess): string;

  export function logItemToStr(data: LogItem): string;

  export class ProcessDispatch implements IProcessDispatch {
      private store;
      private parent;
      constructor(process: IProcess);
      subscribe(event: string, callback: DispatchCallback): void;
      dispatch(event: string, ...args: any[]): Promise<boolean>;
  }

  export class Process implements IProcess {
      dispatch: IProcessDispatch;
      pid: number;
      parentPid: number;
      name: string;
      get _disposed(): boolean;
      _criticalProcess: boolean;
      sourceUrl: string;
      private fileLocks;
      STATE: ProcessState;
      constructor(pid: number, parentPid?: number, ...args: any[]);
      get MEMORY(): number;
      protected stop(): Promise<any>;
      protected start(): Promise<any>;
      __start(): Promise<any>;
      __stop(): Promise<any>;
      killSelf(): Promise<void>;
      protected Log(message: string, level?: LogLevel): void;
      requestFileLock(path: string): Promise<false | undefined>;
      unlockFile(path: string): Promise<false | undefined>;
      setSource(source: string): void;
  }

  export interface Highlighter {
      highlight(line: string, pos: number): string;
      highlightPrompt(prompt: string): string;
      highlightChar(line: string, pos: number): boolean;
  }

  export class IdentityHighlighter implements Highlighter {
      highlight(line: string, pos: number): string;
      highlightPrompt(prompt: string): string;
      highlightChar(line: string, pos: number): boolean;
  }

  export class History extends Process {
      entries: string[];
      maxEntries: number;
      cursor: number;
      private terminal;
      constructor(pid: number, parentPid: number, maxEntries: number, terminal?: IArcTerminal);
      start(): Promise<false | undefined>;
      save(): void;
      restore(): undefined;
      append(text: string): undefined;
      resetCursor(): void;
      next(): string | undefined;
      prev(): string | undefined;
  }

  export enum InputType {
      Text = 0,
      AltEnter = 1,
      ArrowUp = 2,
      ArrowDown = 3,
      ArrowLeft = 4,
      ArrowRight = 5,
      Delete = 6,
      Backspace = 7,
      CtrlA = 8,
      CtrlC = 9,
      CtrlD = 10,
      CtrlE = 11,
      CtrlK = 12,
      CtrlL = 13,
      CtrlQ = 14,
      CtrlS = 15,
      CtrlU = 16,
      End = 17,
      Enter = 18,
      Home = 19,
      ShiftEnter = 20,
      UnsupportedControlChar = 21,
      UnsupportedEscape = 22
  }

  export interface Input {
      inputType: InputType;
      data: string[];
  }

  export function parseInput(data: string): Input[];

  export type RepeatCount = number;

  export class LineBuffer {
      buf: string;
      pos: number;
      buffer(): string;
      pos_buffer(): string;
      length(): number;
      char_length(): number;
      update(text: string, pos: number): void;
      insert(text: string): boolean;
      moveBack(n: number): boolean;
      moveForward(n: number): boolean;
      moveHome(): boolean;
      moveEnd(): boolean;
      startOfLine(): number;
      endOfLine(): number;
      moveLineUp(n: number): boolean;
      moveLineDown(n: number): boolean;
      set_pos(pos: number): void;
      prevPos(n: RepeatCount): number | undefined;
      nextPos(n: RepeatCount): number | undefined;
      backspace(n: RepeatCount): boolean;
      delete(n: RepeatCount): boolean;
      deleteEndOfLine(): boolean;
  }

  export interface Output {
      write(text: string): void;
      print(text: string): void;
      println(text: string): void;
  }

  export class Tty {
      tabWidth: number;
      col: number;
      row: number;
      private out;
      constructor(col: number, row: number, tabWidth: number, out: Output);
      write(text: string): void;
      print(text: string): void;
      println(text: string): void;
      clearScreen(): void;
      calculatePosition(text: string, orig: Position): Position;
      computeLayout(promptSize: Position, line: LineBuffer): Layout;
      refreshLine(prompt: string, line: LineBuffer, oldLayout: Layout, newLayout: Layout, highlighter: Highlighter, conceiled?: boolean): void;
      clearOldRows(layout: Layout): void;
      moveCursor(oldCursor: Position, newCursor: Position): void;
  }

  export class Position {
      col: number;
      row: number;
      constructor(rows?: number, cols?: number);
  }

  export class Layout {
      promptSize: Position;
      cursor: Position;
      end: Position;
      constructor(promptSize: Position);
  }

  export class State extends Process {
      private prompt;
      private promptSize;
      private line;
      private tty;
      private layout;
      private highlighter;
      private highlighting;
      private history;
      private conceiled;
      constructor(pid: number, parentPid: number, prompt: string, tty: Tty, highlighter: Highlighter, history?: History, conceiled?: boolean);
      buffer(): string;
      shouldHighlight(): boolean;
      clearScreen(): void;
      editInsert(text: string): void;
      update(text: string): void;
      editBackspace(n: number): void;
      editDelete(n: number): void;
      editDeleteEndOfLine(): void;
      refresh(): void;
      moveCursorBack(n: number): void;
      moveCursorForward(n: number): void;
      moveCursorUp(n: number): void;
      moveCursorDown(n: number): void;
      moveCursorHome(): void;
      moveCursorEnd(): void;
      moveCursorToEnd(): void;
      previousHistory(): void;
      nextHistory(): void;
      moveCursor(): void;
  }

  export type CheckHandler = (text: string) => boolean;

  export type CtrlCHandler = () => void;

  export type PauseHandler = (resume: boolean) => void;

  export class Readline extends Process implements ITerminalAddon {
      private term;
      private highlighter;
      private history;
      private activeRead;
      private disposables;
      private watermark;
      private highWatermark;
      private lowWatermark;
      private highWater;
      state: State | undefined;
      private checkHandler;
      private ctrlCHandler;
      terminal: IArcTerminal | undefined;
      private pauseHandler;
      constructor(pid: number, parentPid: number, terminal?: IArcTerminal);
      start(): Promise<void>;
      activate(term: Terminal): void;
      dispose(): void;
      appendHistory(text: string): void;
      setHighlighter(highlighter: Highlighter): void;
      setCheckHandler(fn: CheckHandler): void;
      setCtrlCHandler(fn: CtrlCHandler): void;
      setPauseHandler(fn: PauseHandler): void;
      writeReady(): boolean;
      write(text: string): void;
      print(text: string): void;
      println(text: string): void;
      output(): Output;
      tty(): Tty;
      read(prompt: string, conceiled?: boolean): Promise<string>;
      private handleKeyEvent;
      private readData;
      private readPaste;
      private readKey;
  }

  export interface IArcTerminal extends IProcess {
      readonly CONFIG_PATH: string;
      IS_ARCTERM_MODE: boolean;
      lastLine?: string;
      path: string;
      drive: IFilesystemDrive | undefined;
      term: Terminal;
      rl: Readline | undefined;
      var: IArcTermVariables | undefined;
      contents: DirectoryReadReturn | undefined;
      daemon: IUserDaemon | undefined;
      ansiEscapes: typeof ansiEscapes;
      lastCommandErrored: boolean;
      config: ArcTermConfiguration;
      configProvidedExternal: boolean;
      window: ITerminalWindowRuntime | undefined;
      start(): Promise<false | void>;
      readline(): Promise<void>;
      processLine(text: string | undefined): Promise<void>;
      join(path?: string): string;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean | undefined>;
      writeFile(path: string, data: Blob): Promise<boolean | undefined>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean | undefined>;
      moveItem(source: string, destination: string): Promise<boolean | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      deleteItem(path: string): Promise<boolean | undefined>;
      Error(message: string, prefix?: string): Promise<void>;
      Warning(message: string, prefix?: string): Promise<void>;
      Info(message: string, prefix?: string): Promise<void>;
      changeDirectory(path: string): Promise<boolean | undefined>;
      parseFlags(args: string): [
          Arguments,
          string
      ];
      stop(): Promise<any>;
      elevate(data: ElevationData): Promise<boolean>;
      readConfig(): Promise<void>;
      writeConfig(): Promise<void>;
      reload(): Promise<void>;
      tryGetTermWindow(): void;
      migrateConfigurationPath(): Promise<void>;
      handleCommandError(e: Error, command: Constructs<ITerminalProcess>): void;
  }

  export interface ITerminalWindowRuntime extends IAppProcess {
      term: Terminal | undefined;
      overridePopulatable: boolean;
      start(): Promise<void>;
      render(): Promise<void>;
  }

  export interface ITerminalProcess extends IProcess {
      _main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<any>;
  }

  export interface ITerminalProcessConstructor extends Constructs<ITerminalProcess> {
      keyword: string;
      description: string;
      hidden: boolean;
      allowInterrupt: boolean;
  }

  export interface IArcTermVariables {
      term: IArcTerminal;
      getAll(): StaticVariableStore;
      get(key: string): string | undefined;
      set(key: string, value: string): Promise<boolean>;
      delete(key: string): Promise<boolean>;
      replace(str: string): string;
  }

  export interface TerminalCommand {
      keyword: string;
      description: string;
      hidden?: boolean;
      exec: (term: IArcTerminal, flags: Arguments, argv: string[]) => number | Promise<number>;
  }

  export type Arguments = Record<string, string | boolean | any[] | object>;

  export interface Variable {
      get: () => string | undefined;
      set?: (v: string) => Promise<any> | any;
      value?: string;
      readOnly: boolean;
      canDelete: boolean;
  }

  export type VariableStore = {
      [key: string]: Variable;
  };

  export interface StaticVariable {
      value: string | undefined;
      readOnly: boolean;
  }

  export type StaticVariableStore = {
      [key: string]: StaticVariable;
  };

  export type Sections = {
      [key: string]: string[];
  };

  export interface ArcTermConfiguration {
      prompt?: string;
      greeting?: string;
      noLogo?: boolean;
      red?: string;
      green?: string;
      yellow?: string;
      blue?: string;
      cyan?: string;
      magenta?: string;
      foreground?: string;
      background?: string;
      brightBlack?: string;
      backdropOpacity?: number;
  }

  export type ExpandedTerminal = Terminal & {
      process?: ITerminalWindowRuntime;
  };

  export interface IHelpersUserContext extends IUserContext {
      GlobalLoadIndicator(caption?: string, pid?: number, progress?: Partial<GlobalLoadIndicatorProgress>): Promise<{
          caption: ReadableStore<string>;
          stop: () => Promise<void>;
          incrementProgress?: undefined;
          progress?: undefined;
      } | {
          caption: ReadableStore<string>;
          stop: () => Promise<void>;
          incrementProgress: (amount?: number) => void;
          progress: ReadableStore<GlobalLoadIndicatorProgress | undefined>;
      }>;
      Confirm(title: string, message: string, no: string, yes: string, image?: string, pid?: number): Promise<unknown>;
      TerminalWindow(pid?: number): Promise<ExpandedTerminal | undefined>;
      IconPicker(data: Omit<IconPickerData, "returnId">): Promise<string | undefined>;
      IconEditor(initialValue: string, defaultIcon?: string, name?: string): Promise<string>;
      ParentIs(proc: IAppProcess, appId: string): boolean | undefined;
      waitForLeaveInvocationAllow(): Promise<void>;
      safeModeNotice(): void;
      iHaveFeedback(process: IAppProcess): void;
  }

  export interface IIconsUserContext extends IUserContext {
      getAppIcon(app: App): string;
      getAppIconByProcess(process: IAppProcess): string;
      getIcon(id: string): Promise<string>;
      getIconCached(id: string): string;
      getIconStore(id: string): ReadableStore<string>;
  }

  export interface IInitUserContext extends IUserContext {
      anchorInterceptObserver?: MutationObserver;
      _init(): Promise<void>;
      _deactivate(): Promise<void>;
      startAnchorRedirectionIntercept(): void;
      startFilesystemSupplier(): Promise<void>;
      startDriveNotifierWatcher(): void;
      startPreferencesSync(): Promise<void>;
      startSystemStatusRefresh(): Promise<void>;
      startVirtualDesktops(): Promise<void>;
      startServiceHost(broadcast?: (msg: string) => void): Promise<void>;
      startPermissionHandler(): Promise<boolean>;
  }

  export interface Notification {
      title: string;
      message: string;
      icon?: string;
      image?: string;
      timeout?: number;
      buttons?: ErrorButton[];
      timestamp?: number;
      deleted?: boolean;
      className?: string;
  }

  export interface ErrorButton {
      caption: string;
      action: () => void;
      suggested?: boolean;
  }

  export interface INotificationsUserContext extends IUserContext {
      notifications: Map<string, Notification>;
      sendNotification(data: Notification): string | undefined;
      deleteNotification(id: string): void;
      clearNotifications(): void;
  }

  export interface BatteryType {
      charging: boolean;
      chargingTime: number;
      dischargingTime: number;
      level: number;
      onchargingchange: number | null;
      onchargingtimechange: number | null;
      ondischargingtimechange: number | null;
      onlevelchange: number | null;
  }

  export interface IPowerUserContext extends IUserContext {
      battery: ReadableStore<BatteryType | undefined>;
      logoff(): Promise<void>;
      shutdown(): Promise<void>;
      restart(): Promise<void>;
      logoffSafeMode(): Promise<void>;
      toLogin(type: string, props?: Record<string, any>, force?: boolean): Promise<void>;
      closeOpenedApps(type: string, props?: Record<string, any>, force?: boolean): Promise<boolean>;
      batteryInfo(): Promise<BatteryType | undefined>;
  }

  export interface IPreferencesUserContext extends IUserContext {
      syncLock: boolean;
      preferencesUnsubscribe: Unsubscriber | undefined;
      preferences: ReadableStore<UserPreferences>;
      _deactivate(): Promise<void>;
      commitPreferences(preferences: UserPreferences): Promise<boolean | undefined>;
      sanitizeUserPreferences(): Promise<void>;
      getGlobalSetting(key: string): any;
      setGlobalSetting(key: string, value: any): void;
      changeProfilePicture(newValue: string | number): void;
      uploadProfilePicture(): Promise<string | undefined>;
  }

  export interface IAppRendererUserContext extends IUserContext {
      _deactivate(): Promise<void>;
      getAppRendererStyle(accent: string): string;
      setAppRendererClasses(v: UserPreferences): Promise<void>;
      setUserStyleLoader(style: CustomStylePreferences): void;
  }

  export interface IShortcutsUserContext extends IUserContext {
      handleShortcut(path: string, shortcut: ArcShortcut): Promise<any>;
      createShortcut(data: ArcShortcut, path: string, dispatch?: boolean): Promise<boolean>;
      newShortcut(location: string): Promise<void>;
  }

  export interface ISpawnUserContext extends IUserContext {
      spawnApp<T extends IProcess>(id: string, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      spawnOverlay<T extends IProcess>(id: string, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      _spawnApp<T extends IProcess>(id: string, renderTarget?: HTMLDivElement | undefined, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      _spawnOverlay<T extends IProcess>(id: string, renderTarget?: HTMLDivElement | undefined, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      spawnThirdParty<T extends IProcess>(app: App, metaPath: string, ...args: any[]): Promise<T | undefined>;
      tpaError_revisionIncompatible(app: App): void;
      tpaError_noEnableThirdParty(): void;
  }

  export interface IThemesUserContext extends IUserContext {
      themeFromUserPreferences(data: UserPreferences, name: string, author: string, version: string): UserTheme;
      saveCurrentTheme(name: string): void;
      applyThemeData(data: UserTheme, id?: string): boolean | undefined;
      applySavedTheme(id: string): void;
      verifyTheme(data: UserTheme): string | undefined;
      checkCurrentThemeIdValidity(data: UserPreferences): UserPreferences;
      deleteUserTheme(id: string): void;
  }

  export interface IVersionUserContext extends IUserContext {
      isRegisteredVersionOutdated(): Promise<boolean>;
      updateRegisteredVersion(): Promise<void>;
      checkForNewVersion(): Promise<void>;
      mountSourceDrive(): Promise<IFilesystemDrive | false>;
      enableSourceDrive(openAlso?: boolean): Promise<boolean>;
  }

  export interface IWallpaperUserContext extends IUserContext {
      Wallpaper: ReadableStore<Wallpaper>;
      lastWallpaper: ReadableStore<string>;
      updateWallpaper(v: UserPreferences): Promise<void>;
      uploadWallpaper(pid?: number): Promise<Wallpaper | undefined>;
      getWallpaper(id: string, override?: string): Promise<Wallpaper>;
      deleteLocalWallpaper(id: string): Promise<boolean>;
      getLocalWallpaper(id: string): Promise<Wallpaper>;
  }

  export interface IWorkspaceUserContext extends IUserContext {
      virtualDesktop: HTMLDivElement | undefined;
      syncVirtualDesktops(v: UserPreferences): Promise<void>;
      renderVirtualDesktop(uuid: string): void;
      deleteVirtualDesktop(uuid: string): Promise<void>;
      getCurrentDesktop(): HTMLDivElement | undefined;
      createWorkspace(name?: string): void;
      getDesktopIndexByUuid(uuid: string): number;
      switchToDesktopByUuid(uuid: string): void;
      killWindowsOfDesktop(uuid: string): Promise<boolean | undefined>;
      nextDesktop(): boolean;
      previousDesktop(): void;
      moveWindow(pid: number, destination: string): Promise<void>;
  }

  export interface FileDefinition {
      friendlyName: string;
      icon: string;
  }

  export interface FileAssociationConfig {
      associations: {
          apps: Record<string, string[]>;
          handlers: Record<string, string[]>;
      };
      definitions: Record<string, FileDefinition>;
  }

  export interface BaseFileAssociationInfo {
      extension: string;
      handledBy?: {
          app?: string;
          handler?: string;
      };
      icon?: string;
      friendlyName?: string;
  }

  export interface ExpandedFileAssociationInfo {
      extension: string;
      handledBy: {
          app?: App;
          handler?: FileHandler;
      };
      icon: string;
      friendlyName: string;
  }

  export interface IFileAssocService extends IBaseService {
      start(): Promise<void>;
      updateConfiguration(callback: (config: FileAssociationConfig) => FileAssociationConfig | Promise<FileAssociationConfig>): Promise<void>;
      defaultFileAssociations(): FileAssociationConfig;
      getFileAssociation(path: string): ExpandedFileAssociationInfo | undefined;
      getUnresolvedAssociationIcon(path: string): string;
      getConfiguration(): FileAssociationConfig;
  }

  export interface IGlobalDispatch extends IBaseService {
      client: Socket | undefined;
      server: IServerManager;
      authorized: boolean;
      start(): Promise<void>;
      stop(): Promise<void>;
      connected(): Promise<void>;
      sendUpdate(): void;
      subscribe<T extends Array<any> = any[]>(event: string, callback: (...data: T) => void): void;
      emit(event: string, ...data: any[]): void;
      getClients(): Promise<GlobalDispatchClient[]>;
      disconnectClient(clientId: string): Promise<boolean>;
      enableListener(): void;
  }

  export interface TpaLibrary {
      identifier: string;
      author: string;
      version: string;
      entrypoint: `U:/System/Libraries/${string}`;
  }

  export interface ILibraryManagement extends IBaseService {
      Index: Map<string, TpaLibrary>;
      start(): Promise<void>;
      populateIndex(): Promise<void>;
      deleteLibrary(id: string, onStage?: (stage: string) => void): Promise<boolean>;
      getLibrary<T = any>(id: string): Promise<T>;
  }

  export interface Activity {
      authorId: string;
      token: string;
      userAgent: string;
      location: Location;
      action: "unknown" | "login" | "logout";
      createdAt?: Date;
      _id: string;
  }

  export type ExpandedActivity = Activity & {
      user?: ExpandedUserInfo;
  };

  export interface Approval {
      username: string;
      userId: string;
      emailAddress: string;
      validationId: string;
      timestamp: number;
      validated: boolean;
  }

  export interface AuditLog {
      _id: string;
      authorId: string;
      message: string;
      severity: AuditSeverity;
      targetUserId?: string;
      data: Record<any, any>;
      createdAt: string;
  }

  export enum AuditSeverity {
      normal = 0,
      medium = 1,
      high = 2,
      critical = 3,
      deadly = 4
  }

  export enum AuditSeverityIcons {
      moon = 0,
      "shield-checkc" = 1,
      "shield-ellipsis" = 2,
      "shield-x" = 3,
      siren = 4
  }

  export interface FsAccess {
      _id?: string;
      userId: string;
      path: string;
      accessor: string;
      createdAt?: Date;
  }

  export interface FSItem {
      _id: string;
      userId: string;
      itemId: string;
      type: "file" | "directory";
      size?: number;
      mimeType?: string;
      dateCreated: Date;
      dateModified: Date;
      path: string;
  }

  export interface Token {
      value: string;
      userId: string;
      _id?: string;
      lastUsed?: number;
      timesUsed?: number;
      userAgent?: string;
  }

  export type ExpandedToken = Token & {
      user?: ExpandedUserInfo;
  };

  export interface User {
      username: string;
      passwordHash: string;
      preferences: object;
      admin: boolean;
      adminScopes: string[];
      approved: boolean;
      _id: string;
      email: string;
      storageSize?: number;
  }

  export interface ServerLogItem {
      message: string;
      origin: string;
      timestamp: number;
      subs: string[];
  }

  export enum ServerLogLevel {
      info = 0,
      warning = 1,
      error = 2,
      critical = 3
  }

  export interface ServerStatistics {
      counts: ServerStatGroup;
      endpoints: number;
  }

  export interface ServerStatGroup extends Record<string, number> {
      tokens: number;
      users: number;
      indexes: number;
      accessors: number;
      approvals: number;
      bugreps: number;
      audits: number;
      activities: number;
  }

  export interface UserTotp extends Record<string, string | boolean> {
      userId: string;
      secret: string;
      activated: boolean;
      url: string;
  }

  export interface PartialUserTotp {
      _id: string;
      activated: boolean;
      userId: string;
  }

  export interface SharedDriveItem {
      userId: string;
      accessors: string[];
      shareName: string;
      maxSize: number;
      passwordHash: string;
      description?: string;
      locked: boolean;
      _id?: string;
  }

  export interface ShareCreateOptions {
      userId: string;
      description?: string;
      size?: number;
      shareName: string;
      password: string;
  }

  export interface UserStatistics {
      activities: number;
      approvals: number;
      bughunts: number;
      fsaccesses: number;
      indexings: number;
      messages: number;
      shares: number;
      tokens: number;
  }

  export interface ArcPackage {
      _id?: string;
      name: string;
      author: string;
      version: string;
      description: string;
      installLocation: `U:/Applications/${string}` | `U:/System/Libraries/${string}`;
      appId: string;
      store?: {
          image?: string;
          screenshots?: string[];
          banner?: string;
          category?: string;
      };
      dependencies?: string[];
      type: "app" | "library";
  }

  export interface StoreItem {
      name: string;
      userId: string;
      user?: PublicUserInfo;
      pkg: ArcPackage;
      _id: string;
      official: boolean;
      installCount: number;
      lastUpdated: number;
      blocked: boolean;
      size: number;
      createdAt: string;
      updatedAt: string;
      deprecated: boolean;
      description: string;
      verifiedBy?: string;
      verifiedVer?: string;
      verifiedNote?: string;
      verificationAgent?: PublicUserInfo;
  }

  export interface PartialStoreItem {
      _id: string;
      name: string;
      userId: string;
      user?: PublicUserInfo;
      pkg: ArcPackage;
      official: boolean;
      installCount: number;
      lastUpdated: number;
      store?: {
          image?: string;
          screenshots?: string[];
          banner?: string;
          category?: string;
      };
      description: string;
      blocked: boolean;
      size: number;
      createdAt: string;
      updatedAt: string;
      deprecated: boolean;
      verifiedBy?: string;
      verifiedVer?: string;
      verifiedNote?: string;
      verificationAgent?: PublicUserInfo;
  }

  export type InstallStatusType = "mkdir" | "file" | "registration" | "other";

  export type InstallStatusMode = "done" | "failed" | "working";

  export interface InstallStatusItem {
      type: InstallStatusType;
      status: InstallStatusMode;
      content: string;
  }

  export type InstallStatus = Record<string, InstallStatusItem>;

  export interface UpdateInfo {
      name: string;
      oldVer: string;
      newVer: string;
      pkg: StoreItem;
  }

  export interface SharedDriveType {
      userId: string;
      accessors: string[];
      shareName: string;
      maxSize: number;
      passwordHash: string;
      description?: string;
      locked: boolean;
      ownerName?: string;
      _id: string;
  }

  export interface ShareCreateOptions {
      userId: string;
      description?: string;
      size?: number;
      shareName: string;
      password: string;
  }

  export interface IAdminBootstrapper extends IBaseService {
      start(): Promise<void>;
      getUserInfo(): Promise<UserInfo | undefined>;
      mountUserDrive(username: string, driveLetter?: string, onProgress?: FilesystemProgressCallback): Promise<false | IFilesystemDrive | undefined>;
      mountAllUsers(): Promise<void>;
      getAllUsers(): Promise<ExpandedUserInfo[]>;
      getUserByUsername(username: string): Promise<UserInfo | undefined>;
      getServerLogs(): Promise<ServerLogItem[]>;
      getAuditLog(): Promise<AuditLog[]>;
      grantAdmin(username: string): Promise<boolean>;
      revokeAdmin(username: string): Promise<boolean>;
      getPreferencesOf(username: string): Promise<UserPreferences | undefined>;
      setPreferencesOf(username: string, preferences: UserPreferences): Promise<boolean>;
      deleteUser(username: string): Promise<boolean>;
      getStatistics(): Promise<ServerStatistics | undefined>;
      getAllTokens(): Promise<Token[]>;
      purgeAllTokens(): Promise<boolean>;
      purgeOneToken(id: string): Promise<boolean>;
      purgeUserTokens(userId: string): Promise<boolean>;
      deleteBugReport(reportId: string): Promise<boolean>;
      closeBugReport(reportId: string): Promise<boolean>;
      reopenBugReport(reportId: string): Promise<boolean>;
      getAllBugReports(): Promise<BugReport[]>;
      getBugReport(id: string): Promise<BugReport | undefined>;
      getBugHuntStatistics(): Promise<ReportStatistics | undefined>;
      approveUser(username: string): Promise<boolean>;
      disapproveUser(username: string): Promise<boolean>;
      changeEmailOf(username: string, newEmail: string): Promise<boolean>;
      changePasswordOf(username: string, newPassword: string): Promise<boolean>;
      getAvailableScopes(): Promise<Record<string, string>>;
      getScopesOf(username: string): Promise<string[]>;
      setScopesOf(username: string, scopes: string[]): Promise<boolean>;
      getQuotaOf(username: string): Promise<UserQuota | undefined>;
      setQuotaOf(username: string, newQuota: number): Promise<boolean>;
      getAllActivity(): Promise<Activity[]>;
      getActivityOf(username: string): Promise<Activity[]>;
      deleteAllActivities(): Promise<boolean>;
      deleteActivitiesOf(username: string): Promise<boolean>;
      getAllTotp(): Promise<PartialUserTotp[]>;
      getTotpOf(username: string): Promise<UserTotp | undefined>;
      deActivateTotpOf(username: string): Promise<boolean>;
      deleteTotpOf(username: string): Promise<boolean>;
      getAllFsAccessors(): Promise<FsAccess[]>;
      getFsAccessorsOf(username: string): Promise<FsAccess[]>;
      deleteAllFsAccessors(): Promise<boolean>;
      deleteFsAccessorsOf(username: string): Promise<boolean>;
      getAllIndexingNodes(): Promise<FSItem[]>;
      getIndexingNodesOf(username: string): Promise<FSItem[]>;
      forceIndexFor(username: string): Promise<string[]>;
      deleteIndexingOf(username: string): Promise<boolean>;
      canAccess(...scopes: string[]): boolean;
      canAccessP(provided: UserInfo, ...scopes: string[]): boolean;
      getMissingScopes(...scopes: string[]): string[];
      getAllShares(): Promise<SharedDriveType[]>;
      getSharesOf(userId: string): Promise<SharedDriveType[]>;
      deleteShare(shareId: string): Promise<boolean>;
      kickUserFromShare(shareId: string, userId: string): Promise<boolean>;
      addUserToShare(shareId: string, userId: string): Promise<boolean>;
      getShareAccessors(shareId: string): Promise<FSItem[]>;
      deleteShareAccessors(shareId: string): Promise<boolean>;
      changeSharePassword(shareId: string, newPassword: string): Promise<boolean>;
      renameShare(shareId: string, newName: string): Promise<boolean>;
      changeShareOwner(shareId: string, newUserId: string): Promise<boolean>;
      getStatisticsOf(userId: string): Promise<UserStatistics | undefined>;
      setShareQuotaOf(shareId: string, quota: number): Promise<boolean>;
      getShareQuotaOf(shareId: string): Promise<UserQuota | undefined>;
      unlockShare(shareId: string): Promise<boolean>;
      lockShare(shareId: string): Promise<boolean>;
      deleteStoreItem(_id: string): Promise<boolean>;
      deleteUserStoreItems(userId: string): Promise<boolean>;
      getAllStoreItems(): Promise<StoreItem[]>;
      getUserStoreItems(userId: string): Promise<StoreItem[]>;
      deprecatePackage(itemId: string): Promise<boolean>;
      undeprecatePackage(itemId: string): Promise<boolean>;
      getStoreItem(id: string): Promise<StoreItem | undefined>;
      getStoreItemByName(name: string): Promise<StoreItem | undefined>;
      blockStoreItem(id: string, reason?: string): Promise<boolean>;
      unblockStoreItem(id: string, reason?: string): Promise<boolean>;
      storeItemMakeOfficial(id: string): Promise<boolean>;
      storeItemMakeNotOfficial(id: string): Promise<boolean>;
      readStoreItemFiles(id: string, onProgress?: FilesystemProgressCallback, onStatus?: (s: string) => void): Promise<string | false>;
      deleteStoreItemVerification(id: string): Promise<boolean>;
      verifyStoreItem(id: string, note: string): Promise<boolean>;
      getRegisteredVersionFor(userId: string): Promise<string>;
      getMigrationIndexFor(userId: string): Promise<Record<string, number>>;
  }

  export interface ArcProtocol {
      subCommand: string;
      command: string;
      payload: Record<string, any>;
      path: string;
  }

  export interface SpawnAppProtocol extends ArcProtocol {
      subCommand: "";
      command: "spawn_app";
      payload: {
          id: string;
          args: any[];
      };
      path: "/";
  }

  export interface ProtocolHandler {
      name: string;
      className?: string;
      info: (payload: Record<string, any>, daemon: IUserDaemon) => {
          icon: string;
          caption: string;
          title?: string;
      } | undefined;
      action: (payload: Record<string, any>, daemon: IUserDaemon, proto: ArcProtocol) => MaybePromise<boolean>;
  }

  export interface IProtocolServiceProcess extends IBaseService {
      lockObserver: boolean;
      observer?: MutationObserver;
      store: Record<string, ProtocolHandler>;
      start(): Promise<void>;
      parseProtoParam(): void;
      processMutations(mutations: MutationRecord[]): void;
      parseAnchor(anchor: HTMLAnchorElement): void;
      parseUrl(str: string): ArcProtocol | undefined;
      executeUrl(url: string): Promise<boolean | undefined>;
      registerHandler(command: string, handler: ProtocolHandler): boolean;
      unregisterHandler(command: string): boolean;
  }

  export const BuiltinAppImportPathAbsolutes: Record<string, () => Promise<unknown>>;

  export const AdminAppImportPathAbsolutes: Record<string, () => Promise<unknown>>;

  export const appShortcuts: [
      number,
      AppKeyCombinations
  ][];

  export const AppOrigins: Record<string, string>;

  export class FilesystemDrive implements IFilesystemDrive {
      server: IServerManager;
      driveLetter: string | undefined;
      label: string;
      uuid: string;
      readonly FIXED: boolean;
      readonly REMOVABLE: boolean;
      readonly READONLY: boolean;
      readonly HIDDEN: boolean;
      readonly IDENTIFIES_AS: string;
      readonly FILESYSTEM_SHORT: string;
      readonly FILESYSTEM_LONG: string;
      BUSY: boolean;
      protected fileLocks: Record<string, number>;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter?: string, ...args: any[]);
      Log(message: string, level?: LogLevel): void;
      lockFile(path: string, pid: number): Promise<void>;
      releaseLock(path: string, pid: number, fromSystem?: boolean): Promise<void>;
      __spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      __spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      direct(path: string): Promise<string | undefined>;
      quota(): Promise<UserQuota>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      stat(path: string): Promise<FilesystemStat | undefined>;
      isCapable(capability: DriveCapabilities): void;
      tryIsCapable(capability: DriveCapabilities): boolean;
      imageThumbnail(path: string, width: number, height?: number): Promise<string | undefined>;
  }

  export const __Console__: Console;

  export function getMode(): Promise<void>;

  export const ArcMode: () => string;

  export function UUID(): string;

  export const Backend: AxiosInstance;

  export function createAxiosOverlay(): Promise<void>;

  export function arrayBufferToText(buffer: ArrayLike<number> | ArrayBufferLike): string | undefined;

  export function textToArrayBuffer(text: string): ArrayBuffer;

  export function blobToText(blob: Blob): Promise<string>;

  export function textToBlob(text: string, type?: string): Blob;

  export function arrayBufferToBlob(buffer: ArrayBuffer, type?: string): Blob;

  export function blobToDataURL(blob: Blob): Promise<string | undefined>;

  export function toForm(object: Record<string, any>): FormData;

  export const sizeUnits: string[];

  export function join(...args: string[]): string;

  export function dirname(path: string): string;

  export function getItemNameFromPath(path: string): string;

  export function getDriveLetter(path: string, allowUuid?: boolean): string | undefined;

  export function getParentDirectory(p: string): string;

  export function onFileChange(path: string, callback: () => void): void;

  export function onFolderChange(path: string, callback: () => void): void;

  export function formatBytes(bytes: number): string;

  export function DownloadFile(file: ArrayBuffer, filename: string, mimetype?: string): void;

  export class AdminFileSystem extends FilesystemDrive implements IFilesystemDrive {
      READONLY: boolean;
      FIXED: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      label: string;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter: string);
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      createDirectory(path: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string, onProgress: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      quota(): Promise<UserQuota>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      direct(path: string): Promise<string | undefined>;
      stat(path: string): Promise<FilesystemStat | undefined>;
  }

  export class AdminServerDrive extends FilesystemDrive implements IFilesystemDrive {
      private targetUsername;
      READONLY: boolean;
      FIXED: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter: string, targetUsername: string);
      _spinUp(): Promise<boolean>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      createDirectory(path: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string, onProgress: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      stat(path: string): Promise<FilesystemStat | undefined>;
  }

  export function getBuild(): Promise<void>;

  export const ArcBuild: () => string;

  export class BaseService extends Process implements IBaseService {
      host: ServiceHost;
      activated: boolean;
      initBroadcast?: (msg: string) => void;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      deactivate(broadcast?: (m: string) => void): Promise<void>;
  }

  export interface IDistributionServiceProcess extends IBaseService {
      _BUSY: string;
      preferences: UserPreferencesStore;
      start(): Promise<false | undefined>;
      checkBusy(action?: string): string;
      get BUSY(): string;
      set BUSY(value: string);
      addStoreItemToInstalled(item: StoreItem): Promise<boolean | undefined>;
      removeStoreItemFromInstalled(id: string): Promise<boolean | undefined>;
      removeStoreItemFromInstalledByAppId(id: string): Promise<boolean | undefined>;
      loadInstalledStoreItemList(noCache?: boolean): Promise<StoreItem[]>;
      writeInstalledStoreItemList(list: StoreItem[]): Promise<boolean>;
      getInstalledStoreItemById(id: string): Promise<StoreItem | undefined>;
      addPackageToInstalled(item: ArcPackage): Promise<boolean | undefined>;
      removePackageFromInstalled(id: string): Promise<boolean | undefined>;
      loadInstalledPackageList(): Promise<ArcPackage[]>;
      writeInstalledPackageList(list: ArcPackage[]): Promise<boolean>;
      getInstalledPackageByAppId(id: string): Promise<ArcPackage | undefined>;
      getInstalledStoreItemByAppId(id: string): Promise<StoreItem | undefined>;
      uninstallPackage(appId: string, deleteFiles?: boolean, onStage?: (stage: string) => void): Promise<boolean>;
      packageInstallerFromPath<T = IInstallerProcessBase>(path: string, progress?: FilesystemProgressCallback, item?: StoreItem): Promise<T | undefined>;
      getInstallerProcess(metadata: ArcPackage): Constructs<IInstallerProcessBase>;
      packageInstaller<T = IInstallerProcessBase>(zip: JSZip, metadata: ArcPackage, item?: StoreItem): Promise<T | undefined>;
      validatePackage(path: string, progress?: FilesystemProgressCallback): Promise<boolean>;
      getAllStoreItems(): Promise<StoreItem[]>;
      getStoreItemsByAuthor(userId: string): Promise<StoreItem[]>;
      storeItemReadme(id: string): Promise<string>;
      checkForStoreItemUpdate(id: string, installedList?: StoreItem[], allPackages?: StoreItem[]): Promise<UpdateInfo | false>;
      checkForAllStoreItemUpdates(list?: StoreItem[]): Promise<UpdateInfo[]>;
      updateStoreItem<T = IInstallerProcessBase>(id: string, force?: boolean, progress?: FilesystemProgressCallback): Promise<T | false>;
      searchStoreItems(query: string): Promise<PartialStoreItem[]>;
      getInstalledStoreItem(id: string, installedList?: StoreItem[], noCache?: boolean): Promise<StoreItem>;
      getStoreItem(id: string): Promise<StoreItem | undefined>;
      getStoreItemByName(name: string): Promise<StoreItem | undefined>;
      downloadStoreItem(id: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      storeItemInstaller(id: string, onProgress?: FilesystemProgressCallback): Promise<false | IInstallerProcessBase | undefined>;
      publishing_publishPackage(data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      publishing_publishPackageFromPath(path: string, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      publishing_getPublishedPackages(): Promise<StoreItem[]>;
      publishing_deprecateStoreItem(id: string): Promise<boolean>;
      publishing_deleteStoreItem(id: string): Promise<boolean>;
      publishing_updateStoreItem(itemId: string, newData: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      publishing_updateStoreItemFromPath(itemId: string, updatePath: string, onProgress?: FilesystemProgressCallback): Promise<boolean>;
  }

  export interface IInstallerProcessBase extends IProcess {
      parent: IDistributionServiceProcess;
      failReason: ReadableStore<string>;
      installing: ReadableStore<boolean>;
      TOTAL_COUNT: ReadableStore<number>;
      completed: ReadableStore<boolean>;
      COUNT: ReadableStore<number>;
      focused: ReadableStore<string>;
      status: ReadableStore<InstallStatus>;
      start(): Promise<void>;
      initialize(): Promise<void>;
      stop(): Promise<void>;
      onStop(): Promise<void>;
      logStatus(content: string, type?: InstallStatusType, status?: InstallStatusMode): void;
      setCurrentStatus(status: InstallStatusMode): Promise<void>;
      setCurrentContent(content: string): Promise<void>;
      fail(reason: string): void;
      __go(): Promise<boolean>;
      go(): Promise<boolean>;
      mkdir(path: string): Promise<boolean>;
      writeFile(path: string, content: ArrayBuffer): Promise<boolean>;
      createInstallLocation(): Promise<boolean>;
      getFiles(): Promise<{
          files: {
              [k: string]: JSZip.JSZipObject;
          };
          sortedPaths: string[];
      }>;
  }

  export interface IInstallerProcessBaseConstructor extends Constructs<IInstallerProcessBase> {
      validatePackage(metadata: ArcPackage, zip: JSZip): Promise<boolean>;
      uninstallPackage(metadata: ArcPackage, deleteFiles?: boolean, onStage?: (stage: string) => void): Promise<void>;
  }

  export const installArcPkg: (d: IUserDaemon) => FileHandler;

  export function Store<T>(initial?: T): ReadableStore<T>;

  export interface MessageBoxData {
      title: string;
      message?: string;
      content?: Component<any>;
      buttons: MessageBoxButton[];
      image?: string;
      sound?: string;
  }

  export interface MessageBoxButton {
      caption: string;
      action: () => MaybePromise<void | false>;
      suggested?: boolean;
  }

  export type ConfirmationData = Omit<MessageBoxData, "buttons">;

  export class MessageBoxRuntime extends AppProcess {
      data: MessageBoxData | undefined;
      acted: ReadableStore<boolean>;
      constructor(pid: number, parentPid: number, app: AppProcessData, data: MessageBoxData);
      start(): Promise<void>;
      render(): Promise<void>;
      onClose(): Promise<boolean>;
  }

  export const MessageBoxApp: App;

  export function MessageBox(data: MessageBoxData, parentPid: number, overlay?: boolean): Promise<void>;

  export function GetConfirmation(data: ConfirmationData, parentPid: number, overlay?: boolean): Promise<boolean>;

  export const ConditionalButton: (button: ErrorButton, condition: any) => ErrorButton[];

  export function tryJsonParse<T = any>(input: any): T;

  export function tryJsonStringify(input: any, indent: number): string;

  export function keysToLowerCase(obj: any): any;

  export type ValidationObject = {
      [key: string]: any;
  };

  export function validateObject(target: ValidationObject, validation: ValidationObject): boolean;

  export const applyArcTheme: (d: IUserDaemon) => FileHandler;

  export const installTpaFile: (d: IUserDaemon) => FileHandler;

  export const mountZipFile: (d: IUserDaemon) => FileHandler;

  export const runTpaFile: (d: IUserDaemon) => FileHandler;

  export const runTpaBundle: (d: IUserDaemon) => FileHandler;

  export const BuiltinThemes: ThemeStore;

  export const VisualStyles: Record<string, string>;

  export const ActivityIconTranslations: {
      unknown: string;
      login: string;
      logout: string;
  };

  export const ActivityCaptionTranslations: {
      unknown: string;
      login: string;
      logout: string;
  };

  export const TimeFrames: Record<string, string>;

  export const BlankUserTheme: UserTheme;

  export function DefaultFileHandlers(daemon: IUserDaemon): Record<string, FileHandler>;

  export const DefaultAppData: App;

  export const DefaultThirdPartyAppData: {
      metadata: {
          name: string;
          author: string;
          version: string;
          icon: string;
      };
      size: {
          w: number;
          h: number;
      };
      minSize: {
          w: number;
          h: number;
      };
      maxSize: {
          w: number;
          h: number;
      };
      position: {
          centered: boolean;
      };
      state: {
          maximized: boolean;
          minimized: boolean;
          resizable: boolean;
          headless: boolean;
          fullscreen: boolean;
      };
      controls: {
          minimize: boolean;
          maximize: boolean;
          close: boolean;
      };
      entrypoint: string;
      glass: boolean;
      id: string;
  };

  export const AppGroups: Record<string, string>;

  export const UserPaths: {
      Home: string;
      Documents: string;
      Pictures: string;
      Music: string;
      Downloads: string;
      Desktop: string;
      Wallpapers: string;
      Applications: string;
      Trashcan: string;
      Root: string;
      System: string;
      Migrations: string;
      Configuration: string;
      AppShortcuts: string;
      AppRepository: string;
      Libraries: string;
      StartMenu: string;
  };

  export const SystemFolders: string[];

  export const UserPathCaptions: Record<string, string>;

  export const HiddenUserPaths: string[];

  export const UserPathIcons: Record<string, string>;

  export const UserFonts: string[];

  export type ComparisonResult = "lower" | "higher" | "equal";

  export function compareVersion(left: string, right: string): ComparisonResult;

  export class CommandResult<T = string> implements ICommandResult<T> {
      result: T | undefined;
      error?: Error;
      errorMessage?: string;
      successMessage?: string;
      success: boolean;
      constructor(result?: T, options?: CommandResultOptions);
      static Ok<T>(value: T, successMessage?: string): CommandResult<T>;
      static Error<T = any>(errorMessage: string): CommandResult<T>;
  }

  export class ApplicationStorage extends BaseService implements IApplicationStorage {
      private origins;
      private injectedStore;
      buffer: ReadableStore<AppStorage>;
      appIconCache: Record<string, string>;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      protected start(): Promise<any>;
      loadOrigin(id: string, store: AppStoreCb): boolean;
      unloadOrigin(id: string): boolean;
      loadApp(app: App): false | App;
      loadAppModuleFile(path: string): Promise<boolean>;
      injected(): {
          metadata: AppMetadata;
          size: Size;
          minSize: Size;
          maxSize: Size;
          position: MaybeCenteredPosition;
          state: AppState;
          controls: WindowControls;
          assets: AppAssets;
          autoRun?: boolean;
          core?: boolean;
          hidden?: boolean;
          overlay?: boolean;
          glass?: boolean;
          thirdParty?: false;
          id: string;
          originId?: string;
          entrypoint?: string;
          workingDirectory?: string;
          opens?: {
              extensions?: string[];
              mimeTypes?: string[];
          };
          elevated?: boolean;
          acceleratorDescriptions?: Record<string, string>;
          fileSignatures?: Record<string, string>;
          process?: IThirdPartyAppProcess;
          tpaRevision?: number;
          noSafeMode?: boolean;
          vital?: boolean;
          _internalResolvedPath?: string;
          _internalOriginalPath?: string;
          _internalMinVer?: string;
          _internalSysVer?: string;
          _internalLoadTime?: number;
      }[];
      refresh(): Promise<void>;
      get(): Promise<AppStorage>;
      getAppSynchronous(id: string): App | undefined;
      getAppById(id: string, fromBuffer?: boolean): Promise<CommandResult<App>>;
  }

  export const appStoreService: Service;

  export class InstallerProcessBase extends Process {
      protected verboseLog: string[];
      protected metadata?: ArcPackage;
      protected item?: StoreItem;
      protected workingDirectory: string;
      protected zip?: JSZip;
      protected MISC_STEPCOUNT: number;
      parent: DistributionServiceProcess;
      failReason: ReadableStore<string>;
      installing: ReadableStore<boolean>;
      TOTAL_COUNT: ReadableStore<number>;
      completed: ReadableStore<boolean>;
      COUNT: ReadableStore<number>;
      focused: ReadableStore<string>;
      status: ReadableStore<InstallStatus>;
      constructor(pid: number, parentPid: number, zip: JSZip, metadata: ArcPackage, item: StoreItem);
      start(): Promise<void>;
      initialize(): Promise<void>;
      protected afterSuccessfulInstallation(): Promise<any>;
      protected afterFailedInstallation(): Promise<any>;
      stop(): Promise<void>;
      onStop(): Promise<void>;
      logStatus(content: string, type?: InstallStatusType, status?: InstallStatusMode): void;
      setCurrentStatus(status: InstallStatusMode): Promise<void>;
      setCurrentContent(content: string): Promise<void>;
      fail(reason: string): void;
      __go(): Promise<boolean>;
      go(): Promise<boolean>;
      mkdir(path: string): Promise<boolean>;
      writeFile(path: string, content: ArrayBuffer): Promise<boolean>;
      createInstallLocation(): Promise<boolean>;
      getFiles(): Promise<{
          files: {
              [k: string]: JSZip.JSZipObject;
          };
          sortedPaths: string[];
      }>;
      static validatePackage(metadata: ArcPackage, zip: JSZip): Promise<boolean>;
      static uninstallPackage(metadata: ArcPackage, deleteFiles?: boolean, onStage?: (stage: string) => void): Promise<void>;
  }

  export class AppInstallerProcess extends InstallerProcessBase {
      constructor(pid: number, parentPid: number, zip: JSZip, metadata: ArcPackage, item: StoreItem);
      initialize(): Promise<void>;
      go(): Promise<boolean>;
      protected afterSuccessfulInstallation(): Promise<boolean>;
      checkDesktopIcon(): Promise<void>;
      registerApp(): Promise<boolean>;
      static validatePackage(metadata: ArcPackage, zip: JSZip): Promise<boolean>;
      static uninstallPackage(metadata: ArcPackage, deleteFiles?: boolean, onStage?: (stage: string) => void): Promise<void>;
  }

  export class LibraryInstallerProcess extends InstallerProcessBase implements IInstallerProcessBase {
      library?: TpaLibrary;
      constructor(pid: number, parentPid: number, zip: JSZip, metadata: ArcPackage, item: StoreItem);
      initialize(): Promise<void>;
      protected afterSuccessfulInstallation(): Promise<any>;
      go(): Promise<boolean>;
      writeMetadataFile(): Promise<boolean>;
      static validatePackage(metadata: ArcPackage, zip: JSZip): Promise<boolean>;
      static uninstallPackage(metadata: ArcPackage, deleteFiles?: boolean, onStage?: (stage: string) => void): Promise<void>;
  }

  export class DistributionServiceProcess extends BaseService implements IDistributionServiceProcess {
      private readonly dataFolder;
      private readonly tempFolder;
      private readonly installedStoreItemListPath;
      private readonly installedPackagesListPath;
      _BUSY: string;
      private installedStoreItemCache;
      private installedPackagesCache;
      preferences: UserPreferencesStore;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<false | undefined>;
      checkBusy(action?: string): string;
      get BUSY(): string;
      set BUSY(value: string);
      addStoreItemToInstalled(item: StoreItem): Promise<boolean | undefined>;
      removeStoreItemFromInstalled(id: string): Promise<boolean | undefined>;
      removeStoreItemFromInstalledByAppId(id: string): Promise<boolean | undefined>;
      loadInstalledStoreItemList(noCache?: boolean): Promise<StoreItem[]>;
      writeInstalledStoreItemList(list: StoreItem[]): Promise<boolean>;
      getInstalledStoreItemById(id: string): Promise<StoreItem | undefined>;
      addPackageToInstalled(item: ArcPackage): Promise<boolean | undefined>;
      removePackageFromInstalled(id: string): Promise<boolean | undefined>;
      loadInstalledPackageList(): Promise<ArcPackage[]>;
      writeInstalledPackageList(list: ArcPackage[]): Promise<boolean>;
      getInstalledPackageByAppId(id: string): Promise<ArcPackage | undefined>;
      getInstalledStoreItemByAppId(id: string): Promise<StoreItem | undefined>;
      uninstallPackage(appId: string, deleteFiles?: boolean, onStage?: (stage: string) => void): Promise<boolean>;
      packageInstallerFromPath<T = IInstallerProcessBase>(path: string, progress?: FilesystemProgressCallback, item?: StoreItem): Promise<T | undefined>;
      getInstallerProcess(metadata: ArcPackage): IInstallerProcessBaseConstructor;
      packageInstaller<T = IInstallerProcessBase>(zip: JSZip, metadata: ArcPackage, item?: StoreItem): Promise<T | undefined>;
      validatePackage(path: string, progress?: FilesystemProgressCallback): Promise<boolean>;
      getAllStoreItems(): Promise<StoreItem[]>;
      getStoreItemsByAuthor(userId: string): Promise<StoreItem[]>;
      storeItemReadme(id: string): Promise<string>;
      checkForStoreItemUpdate(id: string, installedList?: StoreItem[], allPackages?: StoreItem[]): Promise<UpdateInfo | false>;
      checkForAllStoreItemUpdates(list?: StoreItem[]): Promise<UpdateInfo[]>;
      updateStoreItem<T = IInstallerProcessBase>(id: string, force?: boolean, progress?: FilesystemProgressCallback): Promise<T | false>;
      searchStoreItems(query: string): Promise<PartialStoreItem[]>;
      getInstalledStoreItem(id: string, installedList?: StoreItem[], noCache?: boolean): Promise<StoreItem>;
      getStoreItem(id: string): Promise<StoreItem | undefined>;
      getStoreItemByName(name: string): Promise<StoreItem | undefined>;
      downloadStoreItem(id: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      storeItemInstaller(id: string, onProgress?: FilesystemProgressCallback): Promise<false | IInstallerProcessBase | undefined>;
      publishing_publishPackage(data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      publishing_publishPackageFromPath(path: string, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      publishing_getPublishedPackages(): Promise<StoreItem[]>;
      publishing_deprecateStoreItem(id: string): Promise<boolean>;
      publishing_deleteStoreItem(id: string): Promise<boolean>;
      publishing_updateStoreItem(itemId: string, newData: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      publishing_updateStoreItemFromPath(itemId: string, updatePath: string, onProgress?: FilesystemProgressCallback): Promise<boolean>;
  }

  export const distributionService: Service;

  export interface Message {
      authorId: string;
      title: string;
      body: string;
      recipient: string;
      attachments?: string[];
      _id: string;
      repliesTo?: string;
      correlationId: string;
      createdAt: string;
      updatedAt: string;
      read: boolean;
  }

  export interface MessageCreateData {
      title: string;
      body: string;
      recipients: string[];
      attachments: File[];
  }

  export interface ExpandedMessage extends Message {
      attachmentData?: MessageAttachment[];
      author?: PublicUserInfo;
  }

  export interface ExpandedMessageNode extends ExpandedMessage {
      replies: ExpandedMessageNode[];
  }

  export interface MessageAttachment {
      filename: string;
      size: number;
      mimeType: string;
      realPath: string;
      signature: string;
      _id: string;
  }

  export interface IMessagingInterface extends IBaseService {
      get serverUrl(): string | undefined;
      start(): Promise<void>;
      getSentMessages(): Promise<ExpandedMessage[]>;
      getReceivedMessages(): Promise<ExpandedMessage[]>;
      getInboxListing(): Promise<ExpandedMessage[]>;
      sendMessage(subject: string, recipients: string[], body: string, attachments: File[], repliesTo?: string, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      deleteMessage(messageId: string): Promise<boolean>;
      readMessage(messageId: string): Promise<ExpandedMessage | undefined>;
      readAttachment(messageId: string, attachmentId: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      getMessageThread(messageId?: string): Promise<ExpandedMessageNode[]>;
      buildAttachment(filePath: string, onProgress?: FilesystemProgressCallback): Promise<File | undefined>;
  }

  export const Sleep: (ms?: number) => Promise<unknown>;

  export class GlobalDispatch extends BaseService implements IGlobalDispatch {
      client: Socket | undefined;
      server: IServerManager;
      authorized: boolean;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost);
      start(): Promise<void>;
      stop(broadcast?: (m: string) => void): Promise<void>;
      connected(): Promise<void>;
      sendUpdate(): void;
      subscribe<T extends Array<any> = any[]>(event: string, callback: (...data: T) => void): void;
      emit(event: string, ...data: any[]): void;
      getClients(): Promise<GlobalDispatchClient[]>;
      disconnectClient(clientId: string): Promise<boolean>;
      enableListener(): void;
  }

  export const globalDispatchService: Service;

  export class MessagingInterface extends BaseService implements IMessagingInterface {
      get serverUrl(): string | undefined;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<void>;
      getSentMessages(): Promise<ExpandedMessage[]>;
      getReceivedMessages(): Promise<ExpandedMessage[]>;
      getInboxListing(): Promise<ExpandedMessage[]>;
      sendMessage(subject: string, recipients: string[], body: string, attachments: File[], repliesTo?: string, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      deleteMessage(messageId: string): Promise<boolean>;
      readMessage(messageId: string): Promise<ExpandedMessage | undefined>;
      readAttachment(messageId: string, attachmentId: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      getMessageThread(messageId?: string): Promise<ExpandedMessageNode[]>;
      buildAttachment(filePath: string, onProgress?: FilesystemProgressCallback): Promise<File | undefined>;
  }

  export const messagingService: Service;

  export const AdminProtocolHandlers: Record<string, ProtocolHandler>;

  export const AdminScopes: {
      readonly adminGod: "admin.god";
      readonly adminAuditLog: "admin.auditlog";
      readonly adminLogs: "admin.logs";
      readonly adminGrant: "admin.grant";
      readonly adminRevoke: "admin.revoke";
      readonly adminPreferencesGet: "admin.preferences.get";
      readonly adminUserfsFolder: "admin.userfs.folder";
      readonly adminUserfsFile: "admin.userfs.file";
      readonly adminUserfsDirect: "admin.userfs.direct";
      readonly adminUserfsTree: "admin.userfs.tree";
      readonly adminUserfsQuota: "admin.userfs.quota";
      readonly adminPreferencesPut: "admin.preferences.put";
      readonly adminUsersList: "admin.users.list";
      readonly adminUsersDelete: "admin.users.delete";
      readonly adminUsersChangePswd: "admin.users.changepswd";
      readonly adminUsersChangeEmail: "admin.users.changeemail";
      readonly adminUsersApprove: "admin.users.approve";
      readonly adminUsersDisapprove: "admin.users.disapprove";
      readonly adminStats: "admin.stats";
      readonly adminTokensGet: "admin.tokens.get";
      readonly adminTokensPurgeAllDelete: "admin.tokens.purge.all";
      readonly adminTokensPurgeUserDelete: "admin.tokens.purge.user";
      readonly adminTokensPurgeOneDelete: "admin.tokens.purge.one";
      readonly adminLogout: "admin.logout";
      readonly adminTokenDelete: "admin.token.delete";
      readonly adminScopesPut: "admin.scopes.put";
      readonly adminScopesGet: "admin.scopes.get";
      readonly adminScopesAvailable: "admin.scopes.available";
      readonly adminBugHuntList: "admin.bughunt.reports.list";
      readonly adminBugHuntClose: "admin.bughunt.close";
      readonly adminBugHuntOpen: "admin.bughunt.open";
      readonly adminBugHuntGet: "admin.bughunt.get";
      readonly adminBugHuntDelete: "admin.bughunt.delete";
      readonly adminBugHuntStats: "admin.bughunt.stats";
      readonly adminActivitiesList: "admin.activities.list";
      readonly adminActivitiesUserGet: "admin.activities.user";
      readonly adminActivitiesDelete: "admin.activities.delete";
      readonly adminActivitiesDeleteUser: "admin.activities.delete.user";
      readonly adminTotpGet: "admin.totp.get";
      readonly adminTotpGetUser: "admin.totp.get.user";
      readonly adminTotpDeactivateUser: "admin.totp.deactivate.user";
      readonly adminTotpDeleteUser: "admin.totp.delete.user";
      readonly adminAccessorsGet: "admin.accessors.get";
      readonly adminAccessorsGetUser: "admin.accessors.get.user";
      readonly adminAccessorsDelete: "admin.accessors.delete";
      readonly adminAccessorsDeleteUser: "admin.accessors.delete.user";
      readonly adminIndexGet: "admin.index.get";
      readonly adminIndexGetUser: "admin.index.get.user";
      readonly adminIndexUser: "admin.index.user";
      readonly adminIndexDeleteUser: "admin.index.delete.user";
      readonly adminShareInteract: "admin.share.interact";
      readonly adminShareList: "admin.share.list";
      readonly adminShareListUser: "admin.share.list.user";
      readonly adminShareDelete: "admin.share.delete";
      readonly adminShareMembersGet: "admin.share.members";
      readonly adminShareKick: "admin.share.kick";
      readonly adminShareAddUser: "admin.share.add.user";
      readonly adminShareAccessorsGet: "admin.share.accessors.get";
      readonly adminShareAccessorsDelete: "admin.share.accessors.delete";
      readonly adminShareChangePswd: "admin.share.changepswd";
      readonly adminShareRename: "admin.share.rename";
      readonly adminShareChown: "admin.share.chown";
      readonly adminShareQuotaGet: "admin.share.quota.get";
      readonly adminShareQuotaPut: "admin.share.quota.put";
      readonly adminStoreListAll: "admin.store.list.all";
      readonly adminStoreListUser: "admin.store.list.user";
      readonly adminStoreBlock: "admin.store.block";
      readonly adminStoreUnblock: "admin.store.unblock";
      readonly adminStoreDeleteOne: "admin.store.delete.one";
      readonly adminStoreDeleteUser: "admin.store.delete.user";
      readonly adminStoreDeprecate: "admin.store.deprecate";
      readonly adminStoreUndeprecate: "admin.store.undeprecate";
      readonly adminStoreOfficialOn: "admin.store.official.on";
      readonly adminStoreOfficialOff: "admin.store.official.off";
      readonly adminStoreVerificationGet: "admin.store.verification.get";
      readonly adminStoreVerificationSet: "admin.store.verification.set";
      readonly adminStoreUnverify: "admin.store.unverify";
      readonly adminAfsRead: "admin.afs.read";
      readonly adminAfsWrite: "admin.afs.write";
      readonly adminAfsQuota: "admin.afs.quota";
  };

  export type AdminScopesType = (typeof AdminScopes)[keyof typeof AdminScopes];

  export const AdminScopeCaptions: Record<string, string>;

  export class AdminBootstrapper extends BaseService implements IAdminBootstrapper {
      private userInfo;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<void>;
      private _loadAdminApps;
      getUserInfo(): Promise<UserInfo | undefined>;
      mountUserDrive(username: string, driveLetter?: string, onProgress?: FilesystemProgressCallback): Promise<false | IFilesystemDrive | undefined>;
      mountAllUsers(): Promise<void>;
      getAllUsers(): Promise<ExpandedUserInfo[]>;
      getUserByUsername(username: string): Promise<UserInfo | undefined>;
      getServerLogs(): Promise<ServerLogItem[]>;
      getAuditLog(): Promise<AuditLog[]>;
      grantAdmin(username: string): Promise<boolean>;
      revokeAdmin(username: string): Promise<boolean>;
      getPreferencesOf(username: string): Promise<UserPreferences | undefined>;
      setPreferencesOf(username: string, preferences: UserPreferences): Promise<boolean>;
      deleteUser(username: string): Promise<boolean>;
      getStatistics(): Promise<ServerStatistics | undefined>;
      getAllTokens(): Promise<Token[]>;
      purgeAllTokens(): Promise<boolean>;
      purgeOneToken(id: string): Promise<boolean>;
      purgeUserTokens(userId: string): Promise<boolean>;
      deleteBugReport(reportId: string): Promise<boolean>;
      closeBugReport(reportId: string): Promise<boolean>;
      reopenBugReport(reportId: string): Promise<boolean>;
      getAllBugReports(): Promise<BugReport[]>;
      getBugReport(id: string): Promise<BugReport | undefined>;
      getBugHuntStatistics(): Promise<ReportStatistics | undefined>;
      approveUser(username: string): Promise<boolean>;
      disapproveUser(username: string): Promise<boolean>;
      changeEmailOf(username: string, newEmail: string): Promise<boolean>;
      changePasswordOf(username: string, newPassword: string): Promise<boolean>;
      getAvailableScopes(): Promise<Record<string, string>>;
      getScopesOf(username: string): Promise<string[]>;
      setScopesOf(username: string, scopes: string[]): Promise<boolean>;
      getQuotaOf(username: string): Promise<UserQuota | undefined>;
      setQuotaOf(username: string, newQuota: number): Promise<boolean>;
      getAllActivity(): Promise<Activity[]>;
      getActivityOf(username: string): Promise<Activity[]>;
      deleteAllActivities(): Promise<boolean>;
      deleteActivitiesOf(username: string): Promise<boolean>;
      getAllTotp(): Promise<PartialUserTotp[]>;
      getTotpOf(username: string): Promise<UserTotp | undefined>;
      deActivateTotpOf(username: string): Promise<boolean>;
      deleteTotpOf(username: string): Promise<boolean>;
      getAllFsAccessors(): Promise<FsAccess[]>;
      getFsAccessorsOf(username: string): Promise<FsAccess[]>;
      deleteAllFsAccessors(): Promise<boolean>;
      deleteFsAccessorsOf(username: string): Promise<boolean>;
      getAllIndexingNodes(): Promise<FSItem[]>;
      getIndexingNodesOf(username: string): Promise<FSItem[]>;
      forceIndexFor(username: string): Promise<string[]>;
      deleteIndexingOf(username: string): Promise<boolean>;
      canAccess(...scopes: string[]): boolean;
      canAccessP(provided: UserInfo, ...scopes: string[]): boolean;
      getMissingScopes(...scopes: string[]): string[];
      getAllShares(): Promise<SharedDriveType[]>;
      getSharesOf(userId: string): Promise<SharedDriveType[]>;
      deleteShare(shareId: string): Promise<boolean>;
      kickUserFromShare(shareId: string, userId: string): Promise<boolean>;
      addUserToShare(shareId: string, userId: string): Promise<boolean>;
      getShareAccessors(shareId: string): Promise<FSItem[]>;
      deleteShareAccessors(shareId: string): Promise<boolean>;
      changeSharePassword(shareId: string, newPassword: string): Promise<boolean>;
      renameShare(shareId: string, newName: string): Promise<boolean>;
      changeShareOwner(shareId: string, newUserId: string): Promise<boolean>;
      getStatisticsOf(userId: string): Promise<UserStatistics | undefined>;
      setShareQuotaOf(shareId: string, quota: number): Promise<boolean>;
      getShareQuotaOf(shareId: string): Promise<UserQuota | undefined>;
      unlockShare(shareId: string): Promise<boolean>;
      lockShare(shareId: string): Promise<boolean>;
      deleteStoreItem(_id: string): Promise<boolean>;
      deleteUserStoreItems(userId: string): Promise<boolean>;
      getAllStoreItems(): Promise<StoreItem[]>;
      getUserStoreItems(userId: string): Promise<StoreItem[]>;
      deprecatePackage(itemId: string): Promise<boolean>;
      undeprecatePackage(itemId: string): Promise<boolean>;
      getStoreItem(id: string): Promise<StoreItem | undefined>;
      getStoreItemByName(name: string): Promise<StoreItem | undefined>;
      blockStoreItem(id: string, reason?: string): Promise<boolean>;
      unblockStoreItem(id: string, reason?: string): Promise<boolean>;
      storeItemMakeOfficial(id: string): Promise<boolean>;
      storeItemMakeNotOfficial(id: string): Promise<boolean>;
      readStoreItemFiles(id: string, onProgress?: FilesystemProgressCallback, onStatus?: (s: string) => void): Promise<string | false>;
      deleteStoreItemVerification(id: string): Promise<boolean>;
      verifyStoreItem(id: string, note: string): Promise<boolean>;
      getRegisteredVersionFor(username: string): Promise<string>;
      getMigrationIndexFor(username: string): Promise<Record<string, number>>;
  }

  export const adminService: Service;

  export interface IBugHuntUserSpaceProcess extends IBaseService {
      INVALIDATION_THRESHOLD: number;
      privateCache: BugReport[];
      publicCache: BugReport[];
      cachedPrivateResponseCount: number;
      cachedPublicResponseCount: number;
      module: IBugHunt;
      afterActivate(): Promise<void>;
      sendBugReport(options: ReportOptions): Promise<boolean>;
      getPrivateReports(forceInvalidate?: boolean): Promise<BugReport[]>;
      getPublicReports(forceInvalidate?: boolean): Promise<BugReport[]>;
      refreshPrivateCache(): Promise<void>;
      refreshPublicCache(): Promise<void>;
      refreshAllCaches(): Promise<void>;
  }

  export class BugHuntUserSpaceProcess extends BaseService implements IBugHuntUserSpaceProcess {
      INVALIDATION_THRESHOLD: number;
      privateCache: BugReport[];
      publicCache: BugReport[];
      cachedPrivateResponseCount: number;
      cachedPublicResponseCount: number;
      module: IBugHunt;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      afterActivate(): Promise<void>;
      start(): Promise<void>;
      sendBugReport(options: ReportOptions): Promise<boolean>;
      getPrivateReports(forceInvalidate?: boolean): Promise<BugReport[]>;
      getPublicReports(forceInvalidate?: boolean): Promise<BugReport[]>;
      refreshPrivateCache(): Promise<void>;
      refreshPublicCache(): Promise<void>;
      refreshAllCaches(): Promise<void>;
  }

  export const bhuspService: Service;

  export interface ProjectMetadata {
      metadata: ArcPackage;
      devPort?: number;
      repository?: string;
      outFile: string;
      payloadDir: string;
      buildHash?: string;
      noHotRelaunch?: boolean;
  }

  export type DevEnvActivationResult = "success" | "ping_failed" | "port_mismatch" | "build_mismatch" | "already_connected" | "websock_failed" | "drivemnt_failed";

  export const DevEnvActivationResultCaptions: Record<DevEnvActivationResult, string>;

  export interface IDevelopmentEnvironment extends IBaseService {
      connected: boolean;
      meta?: ProjectMetadata;
      connect(port: number): Promise<DevEnvActivationResult>;
      disconnect(): Promise<undefined>;
      getProjectMeta(): Promise<ProjectMetadata | undefined>;
      mountDevDrive(): Promise<boolean | undefined>;
      restartTpa(): Promise<undefined>;
      killTpa(): Promise<undefined>;
      refreshCSS(filename: string): Promise<void>;
  }

  export interface IThirdPartyAppProcess extends IAppProcess {
      workingDirectory: string;
      operationId: string;
      mutationLock: boolean;
      urlCache: Record<string, string>;
      elements: Record<string, Element>;
      __render__(body: HTMLDivElement): Promise<void>;
  }

  export class ThirdPartyAppProcess extends AppProcess implements IThirdPartyAppProcess {
      static readonly TPA_REV = 1;
      workingDirectory: string;
      operationId: string;
      mutationLock: boolean;
      urlCache: Record<string, string>;
      elements: Record<string, Element>;
      constructor(pid: number, parentPid: number, app: AppProcessData, operationId: string, workingDirectory: string, ...args: any[]);
      __render__(body: HTMLDivElement): Promise<void>;
  }

  export class DevDrive extends FilesystemDrive implements IFilesystemDrive {
      FIXED: boolean;
      REMOVABLE: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      private axios;
      private url;
      label: string;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter: string, axios: AxiosInstance, url: string);
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
  }

  export class DevelopmentEnvironment extends BaseService implements IDevelopmentEnvironment {
      connected: boolean;
      private port?;
      private url?;
      private client;
      private axios?;
      meta?: ProjectMetadata;
      private pids;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      deactivate(broadcast?: (m: string) => void): Promise<void>;
      start(): Promise<void>;
      connect(port: number): Promise<DevEnvActivationResult>;
      disconnect(): Promise<undefined>;
      getProjectMeta(): Promise<ProjectMetadata | undefined>;
      mountDevDrive(): Promise<boolean | undefined>;
      restartTpa(): Promise<undefined>;
      killTpa(): Promise<undefined>;
      refreshCSS(filename: string): Promise<void>;
  }

  export const devEnvironmentService: Service;

  export const AudioFileDefinitions: Record<string, FileDefinition>;

  export const ImageFileDefinitions: Record<string, FileDefinition>;

  export const VideoFileDefinitions: Record<string, FileDefinition>;

  export const DefaultFileDefinitions: Record<string, FileDefinition>;

  export class FileAssocService extends BaseService implements IFileAssocService {
      private CONFIG_PATH;
      private Configuration;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<void>;
      private loadConfiguration;
      private writeConfiguration;
      updateConfiguration(callback: (config: FileAssociationConfig) => FileAssociationConfig | Promise<FileAssociationConfig>): Promise<void>;
      defaultFileAssociations(): FileAssociationConfig;
      getFileAssociation(path: string): ExpandedFileAssociationInfo | undefined;
      getUnresolvedAssociationIcon(path: string): string;
      getConfiguration(): FileAssociationConfig;
  }

  export const fileAssocService: Service;

  export interface IIconService extends IBaseService {
      PATH: string;
      FILE_CACHE: Record<string, string>;
      ICON_TYPES: string[];
      DEFAULT_ICON: string;
      Configuration: ReadableStore<Record<string, string>>;
      start(): Promise<void>;
      loadConfiguration(): Promise<Record<string, string>>;
      writeConfiguration(config: Record<string, string>): Promise<Record<string, string>>;
      defaultConfiguration(): Record<string, string>;
      getIcon(id: string, noCache?: boolean): Promise<string>;
      getIconCached(id: string): string;
      parseIcon(id: string): [
          "fs" | "builtin" | "app",
          string
      ];
      cacheEverything(): Promise<void>;
      getAppIcon(app: App, workingDirectory?: string): string;
      getGroupedIcons(): Record<string, Record<string, string>>;
  }

  export function getAllImages(): Record<string, string>;

  export function getGroupedIcons(): Record<string, Record<string, string>>;

  export function getIconPath(id: string): string;

  export function iconIdFromPath(path: string): string;

  export function maybeIconId(id: string): string;

  export class IconService extends BaseService implements IIconService {
      PATH: string;
      FILE_CACHE: Record<string, string>;
      ICON_TYPES: string[];
      DEFAULT_ICON: string;
      Configuration: ReadableStore<Record<string, string>>;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<void>;
      loadConfiguration(): Promise<Record<string, string>>;
      writeConfiguration(config: Record<string, string>): Promise<Record<string, string>>;
      defaultConfiguration(): Record<string, string>;
      getIcon(id: string, noCache?: boolean): Promise<string>;
      getIconCached(id: string): string;
      parseIcon(id: string): [
          "fs" | "builtin" | "app",
          string
      ];
      cacheEverything(): Promise<void>;
      getAppIcon(app: App, workingDirectory?: string): string;
      getGroupedIcons(): Record<string, Record<string, string>>;
  }

  export const iconService: Service;

  export function WindowSystemContextMenu(): AppContextMenu;

  export class ContextMenuRuntime extends AppProcess {
      contextData: ReadableStore<ContextMenuInstance | null>;
      CLICKLOCKED: boolean;
      contextProps: Record<string, any[]>;
      currentMenu: ReadableStore<string>;
      private abortController;
      private readonly validContexMenuTags;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      stop(): Promise<void>;
      render(): Promise<false | undefined>;
      assignContextMenuHooks(): void;
      createContextMenu(data: ContextMenuInstance): Promise<void>;
      closeContextMenu(): void;
      handleContext(e: MouseEvent): Promise<void>;
      getWindowByEventTarget(target: EventTarget[]): HTMLDivElement | null;
      getContextEntry(pid: number, scope: string): ContextMenuItem[];
      getContextMenuScope(e: MouseEvent): HTMLDivElement | null;
      composePosition(x: number, y: number, mW: number, mH: number): [
          number,
          number
      ];
  }

  export function contextProps(node: HTMLElement, args: any[]): {
      destroy: () => void;
  } | undefined;

  export function contextMenu(node: HTMLElement, [items, process]: [
      ContextMenuItem[],
      IAppProcess
  ]): {
      destroy: () => void;
  } | undefined;

  export class CustomTitlebar {
      #private;
      constructor(process: IAppProcess, className?: string);
      render(target: HTMLElement): void;
      dispose(): void;
      getTarget(): HTMLElement | undefined;
      getTitlebar(): HTMLDivElement | undefined;
  }

  export enum PermissionGrantResult {
      InvalidPermission = 0,
      AlreadyGranted = 1,
      Ok = 2
  }

  export enum PermissionRevokeResult {
      InvalidPermission = 0,
      NotGranted = 1,
      Ok = 2
  }

  export type PermissionStorage = {
      allowed: Record<string, string[]>;
      denied: Record<string, string[]>;
      registration: Record<string, string>;
  };

  export interface PermissionInfo {
      friendlyName: string;
      friendlyDescription: string;
      icon: string;
      permission: PermissionString;
      canDo: PermissionCanDo[];
      cantDo: PermissionCanDo[];
  }

  export interface PermissionCanDo {
      what: string;
      icon: string;
      critical?: boolean;
      extraWarning?: string;
  }

  export type SudoPermissions = Record<string, number>;

  export const PERMISSIONS: readonly [
      "PERMISSION_USER_CONTEXT_ACCOUNT",
      "PERMISSION_USER_CONTEXT_APPLICATIONS",
      "PERMISSION_USER_CONTEXT_APPREGISTRATION",
      "PERMISSION_USER_CONTEXT_FILESYSTEM",
      "PERMISSION_USER_CONTEXT_HELPERS",
      "PERMISSION_USER_CONTEXT_ICONS",
      "PERMISSION_USER_CONTEXT_NOTIFICATIONS",
      "PERMISSION_USER_CONTEXT_POWER",
      "PERMISSION_USER_CONTEXT_PREFERENCES",
      "PERMISSION_USER_CONTEXT_SHORTCUTS",
      "PERMISSION_USER_CONTEXT_SPAWN",
      "PERMISSION_USER_CONTEXT_THEMES",
      "PERMISSION_USER_CONTEXT_WALLPAPER",
      "PERMISSION_USER_CONTEXT_WORKSPACES",
      "PERMISSION_FS_READ_EXTERNAL",
      "PERMISSION_FS_WRITE_EXTERNAL",
      "PERMISSION_FS_READ_APPLICATIONS",
      "PERMISSION_FS_WRITE_APPLICATIONS",
      "PERMISSION_FS_READ_SYSTEM",
      "PERMISSION_FS_WRITE_SYSTEM",
      "PERMISSION_FS_READ_CONFIG",
      "PERMISSION_FS_WRITE_CONFIG",
      "PERMISSION_FS_READ_USER",
      "PERMISSION_FS_WRITE_USER",
      "PERMISSION_FS_READ",
      "PERMISSION_FS_WRITE",
      "PERMISSION_FS_DRIVES",
      "PERMISSION_KMOD_ENV",
      "PERMISSION_APPRENDERER"
  ];

  export const PERMISSION_NAMES: Record<PermissionString, string>;

  export type PermissionString = (typeof PERMISSIONS)[number];

  export const PERMISSION_ERRORS: readonly [
      "PERMERR_ALREADY_OWNED",
      "PERMERR_NOT_DENIED",
      "PERMERR_DENIED",
      "PERMERR_NOT_GRANTED",
      "PERMERR_INVALID_PERMSTR",
      "PERMERR_NATURE_UNKNOWN",
      "PERMERR_ALREADY_DENIED",
      "PERMERR_SUDO_NOT_GRANTED",
      "PERMERR_SUDO_ALREADY_GRANTED",
      "PERMERR_SUDO_INVALID",
      "PERMERR_SUDO_EXPIRED",
      "PERMERR_OK"
  ];

  export type PermissionError = (typeof PERMISSION_ERRORS)[number];

  export const PermissionErrorCaptions: Record<PermissionError, string>;

  export const DefaultPermissionStorage: PermissionStorage;

  export interface IPermissionHandler {
      _criticalProcess: boolean;
      Configuration: ReadableStore<PermissionStorage>;
      readConfiguration(): Promise<void>;
      writeConfiguration(config: PermissionStorage): Promise<void>;
      hasPermission(process: IProcess, permission: PermissionString): boolean;
      grantPermission(process: IProcess, permission: PermissionString): void;
      revokePermission(process: IProcess, permission: PermissionString): void;
      isDenied(process: IProcess, permission: PermissionString): boolean;
      denyPermission(process: IProcess, permission: PermissionString): void;
      revokeDenial(process: IProcess, permission: PermissionString): void;
      requestPermission(process: IProcess, permission: PermissionString): Promise<void>;
      hasPermissionExplicit<T>(process: IProcess, permission: PermissionString, returnValue?: T): T | undefined;
      getOrCreatePermissionedFilesystemInteractor(process: IProcess): IPermissionedFilesystemInteractor;
      hasReadPermissionForPathExplicit(process: IProcess, path: string): void;
      hasWritePermissionForPathExplicit(process: IProcess, path: string): void;
      validatePermissionString(permission: PermissionString): void;
      throwError(error: PermissionError, client?: string, permission?: PermissionString): void;
      getPermissionId(process: IProcess, sudo?: boolean): string;
      setRegistration(clientId: string, appId: string): void;
      removeRegistration(clientId: string): void;
      removeApplication(appId: string): void;
      hasSudo(process: IProcess): boolean;
      grantSudo(process: IProcess): void;
      revokeSudo(process: IProcess): void;
      refreshSudo(process: IProcess): void;
      resetPermissionsById(permissionId: string): void;
      isDenied(process: IProcess, permission: PermissionString): boolean;
      revokeDenialById(permissionId: string, permission: PermissionString): void;
      grantPermissionById(permissionId: string, permission: PermissionString): void;
      hasPermissionById(permissionId: string, permission: PermissionString): boolean;
      denyPermissionById(permissionId: string, permission: PermissionString): void;
      isDeniedById(permissionId: string, permission: PermissionString): boolean;
      revokePermissionById(permissionId: string, permission: PermissionString): void;
  }

  export interface IPermissionedFilesystemInteractor {
      get mountDrive(): (<T extends IFilesystemDrive = IFilesystemDrive>(id: string, supplier: any, letter?: string, onProgress?: FilesystemProgressCallback, ...args: any[]) => Promise<T | false>) | undefined;
      get getDriveIdByIdentifier(): ((identifier: string) => string) | undefined;
      get umountDrive(): ((id: string, fromSystem?: boolean, onProgress?: FilesystemProgressCallback) => Promise<boolean>) | undefined;
      get getDriveByLetter(): ((letter: string, error?: boolean) => IFilesystemDrive) | undefined;
      get getDriveIdentifier(): ((path: string) => string) | undefined;
      get getDriveByPath(): ((path: string) => IFilesystemDrive) | undefined;
      get validatePath(): ((p: string) => void) | undefined;
      get removeDriveLetter(): ((p: string) => string) | undefined;
      get validateDriveLetter(): ((letter: string) => void) | undefined;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      createDirectory(path: string, dispath?: boolean): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      moveItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      deleteItem(path: string, dispatch?: boolean): Promise<boolean>;
      uploadFiles(target: string, accept?: string, multiple?: boolean, onProgress?: FilesystemProgressCallback): Promise<UploadReturn>;
      direct(path: string): Promise<string | undefined>;
      isDirectory(path: string): Promise<false | DirectoryReadReturn>;
      stat(path: string): Promise<ExtendedStat | undefined>;
  }

  export class PermissionedFilesystemInteractor implements IPermissionedFilesystemInteractor {
      #private;
      constructor(process: IProcess);
      get mountDrive(): (<T extends IFilesystemDrive = IFilesystemDrive>(id: string, supplier: Constructs<import("$interfaces/fs").IFilesystemDrive>, letter?: string, onProgress?: FilesystemProgressCallback, ...args: any[]) => Promise<T | false>) | undefined;
      get getDriveIdByIdentifier(): ((identifier: string) => string) | undefined;
      get umountDrive(): ((id: string, fromSystem?: boolean, onProgress?: FilesystemProgressCallback) => Promise<boolean>) | undefined;
      get getDriveByLetter(): ((letter: string, error?: boolean) => IFilesystemDrive) | undefined;
      get getDriveIdentifier(): ((path: string) => string) | undefined;
      get getDriveByPath(): ((path: string) => IFilesystemDrive) | undefined;
      get validatePath(): ((p: string) => void) | undefined;
      get removeDriveLetter(): ((p: string) => string) | undefined;
      get validateDriveLetter(): ((letter: string) => void) | undefined;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      createDirectory(path: string, dispath?: boolean): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      moveItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      deleteItem(path: string, dispatch?: boolean): Promise<boolean>;
      uploadFiles(target: string, accept?: string, multiple?: boolean, onProgress?: FilesystemProgressCallback): Promise<UploadReturn>;
      direct(path: string): Promise<string | undefined>;
      isDirectory(path: string): Promise<false | DirectoryReadReturn>;
      stat(path: string): Promise<ExtendedStat | undefined>;
  }

  export let Permissions: IPermissionHandler;

  export class PermissionHandler extends Process implements IPermissionHandler {
      #private;
      _criticalProcess: boolean;
      private PERMISSION_ID_REGEX;
      Configuration: ReadableStore<PermissionStorage>;
      private SudoConfiguration;
      private FirstSubDone;
      private configurationWriteTimeout?;
      constructor(pid: number, parentPid: number);
      protected start(): Promise<any>;
      readConfiguration(): Promise<void>;
      writeConfiguration(config: PermissionStorage): Promise<void>;
      hasPermission(process: IProcess, permission: PermissionString): boolean;
      hasPermissionById(permissionId: string, permission: PermissionString): boolean;
      grantPermission(process: IProcess, permission: PermissionString): void;
      grantPermissionById(permissionId: string, permission: PermissionString): void;
      revokePermission(process: IProcess, permission: PermissionString): void;
      revokePermissionById(permissionId: string, permission: PermissionString): void;
      isDenied(process: IProcess, permission: PermissionString): boolean;
      isDeniedById(permissionId: string, permission: PermissionString): boolean;
      denyPermission(process: IProcess, permission: PermissionString): void;
      denyPermissionById(permissionId: string, permission: PermissionString): void;
      revokeDenial(process: IProcess, permission: PermissionString): void;
      revokeDenialById(permissionId: string, permission: PermissionString): void;
      requestPermission(process: IProcess, permission: PermissionString): Promise<void>;
      hasPermissionExplicit<T>(process: IProcess, permission: PermissionString, returnValue?: T): T | undefined;
      getOrCreatePermissionedFilesystemInteractor(process: IProcess): IPermissionedFilesystemInteractor;
      hasReadPermissionForPathExplicit(process: IProcess, path: string): void;
      hasWritePermissionForPathExplicit(process: IProcess, path: string): void;
      resetPermissionsById(permissionId: string): void;
      validatePermissionString(permission: PermissionString): void;
      validatePermissionId(permissionId: string): void;
      throwError(error: PermissionError, client?: string, permission?: PermissionString): void;
      getPermissionId(process: IProcess, sudo?: boolean): string;
      setRegistration(clientId: string, appId: string): void;
      removeRegistration(clientId: string): void;
      removeApplication(appId: string): void;
      hasSudo(process: IProcess): boolean;
      grantSudo(process: IProcess): void;
      revokeSudo(process: IProcess): void;
      refreshSudo(process: IProcess): void;
  }

  export class ProcessWithPermissions extends Process {
      get HAS_SUDO(): boolean;
      constructor(pid: number, parentPid: number, ...args: any[]);
      requestPermission(permission: PermissionString): Promise<void>;
      get accountContext(): IAccountUserContext | undefined;
      get applicationsContext(): IApplicationsUserContext | undefined;
      get appregistrationContext(): IAppRegistrationUserContext | undefined;
      get elevationContext(): IElevationUserContext | undefined;
      get filesystemContext(): IFilesystemUserContext | undefined;
      get helpersContext(): IHelpersUserContext | undefined;
      get iconsContext(): IIconsUserContext | undefined;
      get notificationsContext(): INotificationsUserContext | undefined;
      get powerContext(): IPowerUserContext | undefined;
      get preferencesContext(): ReadableStore<import("$types/user").UserPreferences> | undefined;
      get shortcutsContext(): IShortcutsUserContext | undefined;
      get spawnContext(): ISpawnUserContext | undefined;
      get themesContext(): IThemesUserContext | undefined;
      get wallpaperContext(): IWallpaperUserContext | undefined;
      get workspacesContext(): IWorkspaceUserContext | undefined;
      get env(): IEnvironment | undefined;
      get appRenderer(): IAppRenderer | undefined;
      get fs(): IPermissionedFilesystemInteractor;
  }

  export class TrayIconProcess extends ProcessWithPermissions implements ITrayIconProcess {
      targetPid: number;
      identifier: string;
      popup?: TrayPopup;
      context?: ContextMenuItem[];
      action?: (targetedProcess: IProcess) => void;
      componentMount: Record<string, any>;
      icon: string;
      shell: IShellRuntime;
      constructor(pid: number, parentPid: number, data: ShellTrayIcon);
      __render(): Promise<void>;
      stop(): Promise<void>;
      renderPopup(popup: HTMLDivElement, target: IProcess): Promise<void>;
      getPopupBody(): Element | null;
  }

  export type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null;

  export interface RawAxiosHeaders {
      [key: string]: AxiosHeaderValue;
  }

  export type MethodsHeaders = Partial<{
      [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & {
      common: AxiosHeaders;
  }>;

  export type AxiosHeaderMatcher = string | RegExp | ((this: AxiosHeaders, value: string, name: string) => boolean);

  export type AxiosHeaderParser = (this: AxiosHeaders, value: AxiosHeaderValue, header: string) => any;

  export class AxiosHeaders {
      constructor(headers?: RawAxiosHeaders | AxiosHeaders | string);
      [key: string]: any;
      set(headerName?: string, value?: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      set(headers?: RawAxiosHeaders | AxiosHeaders | string, rewrite?: boolean): AxiosHeaders;
      get(headerName: string, parser: RegExp): RegExpExecArray | null;
      get(headerName: string, matcher?: true | AxiosHeaderParser): AxiosHeaderValue;
      has(header: string, matcher?: AxiosHeaderMatcher): boolean;
      delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;
      clear(matcher?: AxiosHeaderMatcher): boolean;
      normalize(format: boolean): AxiosHeaders;
      concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
      toJSON(asStrings?: boolean): RawAxiosHeaders;
      static from(thing?: AxiosHeaders | RawAxiosHeaders | string): AxiosHeaders;
      static accessor(header: string | string[]): AxiosHeaders;
      static concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
      setContentType(value: ContentType, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getContentType(parser?: RegExp): RegExpExecArray | null;
      getContentType(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasContentType(matcher?: AxiosHeaderMatcher): boolean;
      setContentLength(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getContentLength(parser?: RegExp): RegExpExecArray | null;
      getContentLength(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasContentLength(matcher?: AxiosHeaderMatcher): boolean;
      setAccept(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getAccept(parser?: RegExp): RegExpExecArray | null;
      getAccept(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasAccept(matcher?: AxiosHeaderMatcher): boolean;
      setUserAgent(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getUserAgent(parser?: RegExp): RegExpExecArray | null;
      getUserAgent(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasUserAgent(matcher?: AxiosHeaderMatcher): boolean;
      setContentEncoding(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getContentEncoding(parser?: RegExp): RegExpExecArray | null;
      getContentEncoding(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasContentEncoding(matcher?: AxiosHeaderMatcher): boolean;
      setAuthorization(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getAuthorization(parser?: RegExp): RegExpExecArray | null;
      getAuthorization(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasAuthorization(matcher?: AxiosHeaderMatcher): boolean;
      [Symbol.iterator](): IterableIterator<[
          string,
          AxiosHeaderValue
      ]>;
  }

  export type CommonRequestHeadersList = "Accept" | "Content-Length" | "User-Agent" | "Content-Encoding" | "Authorization";

  export type ContentType = AxiosHeaderValue | "text/html" | "text/plain" | "multipart/form-data" | "application/json" | "application/x-www-form-urlencoded" | "application/octet-stream";

  export type RawAxiosRequestHeaders = Partial<RawAxiosHeaders & {
      [Key in CommonRequestHeadersList]: AxiosHeaderValue;
  } & {
      "Content-Type": ContentType;
  }>;

  export type AxiosRequestHeaders = RawAxiosRequestHeaders & AxiosHeaders;

  export type CommonResponseHeadersList = "Server" | "Content-Type" | "Content-Length" | "Cache-Control" | "Content-Encoding";

  export type RawCommonResponseHeaders = {
      [Key in CommonResponseHeadersList]: AxiosHeaderValue;
  } & {
      "set-cookie": string[];
  };

  export type RawAxiosResponseHeaders = Partial<RawAxiosHeaders & RawCommonResponseHeaders>;

  export type AxiosResponseHeaders = RawAxiosResponseHeaders & AxiosHeaders;

  export interface AxiosRequestTransformer {
      (this: InternalAxiosRequestConfig, data: any, headers: AxiosRequestHeaders): any;
  }

  export interface AxiosResponseTransformer {
      (this: InternalAxiosRequestConfig, data: any, headers: AxiosResponseHeaders, status?: number): any;
  }

  export interface AxiosAdapter {
      (config: InternalAxiosRequestConfig): AxiosPromise;
  }

  export interface AxiosBasicCredentials {
      username: string;
      password: string;
  }

  export interface AxiosProxyConfig {
      host: string;
      port: number;
      auth?: AxiosBasicCredentials;
      protocol?: string;
  }

  export enum HttpStatusCode {
      Continue = 100,
      SwitchingProtocols = 101,
      Processing = 102,
      EarlyHints = 103,
      Ok = 200,
      Created = 201,
      Accepted = 202,
      NonAuthoritativeInformation = 203,
      NoContent = 204,
      ResetContent = 205,
      PartialContent = 206,
      MultiStatus = 207,
      AlreadyReported = 208,
      ImUsed = 226,
      MultipleChoices = 300,
      MovedPermanently = 301,
      Found = 302,
      SeeOther = 303,
      NotModified = 304,
      UseProxy = 305,
      Unused = 306,
      TemporaryRedirect = 307,
      PermanentRedirect = 308,
      BadRequest = 400,
      Unauthorized = 401,
      PaymentRequired = 402,
      Forbidden = 403,
      NotFound = 404,
      MethodNotAllowed = 405,
      NotAcceptable = 406,
      ProxyAuthenticationRequired = 407,
      RequestTimeout = 408,
      Conflict = 409,
      Gone = 410,
      LengthRequired = 411,
      PreconditionFailed = 412,
      PayloadTooLarge = 413,
      UriTooLong = 414,
      UnsupportedMediaType = 415,
      RangeNotSatisfiable = 416,
      ExpectationFailed = 417,
      ImATeapot = 418,
      MisdirectedRequest = 421,
      UnprocessableEntity = 422,
      Locked = 423,
      FailedDependency = 424,
      TooEarly = 425,
      UpgradeRequired = 426,
      PreconditionRequired = 428,
      TooManyRequests = 429,
      RequestHeaderFieldsTooLarge = 431,
      UnavailableForLegalReasons = 451,
      InternalServerError = 500,
      NotImplemented = 501,
      BadGateway = 502,
      ServiceUnavailable = 503,
      GatewayTimeout = 504,
      HttpVersionNotSupported = 505,
      VariantAlsoNegotiates = 506,
      InsufficientStorage = 507,
      LoopDetected = 508,
      NotExtended = 510,
      NetworkAuthenticationRequired = 511
  }

  export type Method = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK";

  export type ResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" | "formdata";

  export type responseEncoding = "ascii" | "ASCII" | "ansi" | "ANSI" | "binary" | "BINARY" | "base64" | "BASE64" | "base64url" | "BASE64URL" | "hex" | "HEX" | "latin1" | "LATIN1" | "ucs-2" | "UCS-2" | "ucs2" | "UCS2" | "utf-8" | "UTF-8" | "utf8" | "UTF8" | "utf16le" | "UTF16LE";

  export interface TransitionalOptions {
      silentJSONParsing?: boolean;
      forcedJSONParsing?: boolean;
      clarifyTimeoutError?: boolean;
  }

  export interface GenericAbortSignal {
      readonly aborted: boolean;
      onabort?: ((...args: any) => any) | null;
      addEventListener?: (...args: any) => any;
      removeEventListener?: (...args: any) => any;
  }

  export interface FormDataVisitorHelpers {
      defaultVisitor: SerializerVisitor;
      convertValue: (value: any) => any;
      isVisitable: (value: any) => boolean;
  }

  export interface SerializerVisitor {
      (this: GenericFormData, value: any, key: string | number, path: null | Array<string | number>, helpers: FormDataVisitorHelpers): boolean;
  }

  export interface SerializerOptions {
      visitor?: SerializerVisitor;
      dots?: boolean;
      metaTokens?: boolean;
      indexes?: boolean | null;
  }

  export interface FormSerializerOptions extends SerializerOptions {
  }

  export interface ParamEncoder {
      (value: any, defaultEncoder: (value: any) => any): any;
  }

  export interface CustomParamsSerializer {
      (params: Record<string, any>, options?: ParamsSerializerOptions): string;
  }

  export interface ParamsSerializerOptions extends SerializerOptions {
      encode?: ParamEncoder;
      serialize?: CustomParamsSerializer;
  }

  export type MaxUploadRate = number;

  export type MaxDownloadRate = number;

  export type BrowserProgressEvent = any;

  export interface AxiosProgressEvent {
      loaded: number;
      total?: number;
      progress?: number;
      bytes: number;
      rate?: number;
      estimated?: number;
      upload?: boolean;
      download?: boolean;
      event?: BrowserProgressEvent;
      lengthComputable: boolean;
  }

  export type Milliseconds = number;

  export type AxiosAdapterName = "fetch" | "xhr" | "http" | string;

  export type AxiosAdapterConfig = AxiosAdapter | AxiosAdapterName;

  export type AddressFamily = 4 | 6 | undefined;

  export interface LookupAddressEntry {
      address: string;
      family?: AddressFamily;
  }

  export type LookupAddress = string | LookupAddressEntry;

  export interface AxiosRequestConfig<D = any> {
      url?: string;
      method?: Method | string;
      baseURL?: string;
      transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
      transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
      headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
      params?: any;
      paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer;
      data?: D;
      timeout?: Milliseconds;
      timeoutErrorMessage?: string;
      withCredentials?: boolean;
      adapter?: AxiosAdapterConfig | AxiosAdapterConfig[];
      auth?: AxiosBasicCredentials;
      responseType?: ResponseType;
      responseEncoding?: responseEncoding | string;
      xsrfCookieName?: string;
      xsrfHeaderName?: string;
      onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
      onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
      maxContentLength?: number;
      validateStatus?: ((status: number) => boolean) | null;
      maxBodyLength?: number;
      maxRedirects?: number;
      maxRate?: number | [
          MaxUploadRate,
          MaxDownloadRate
      ];
      beforeRedirect?: (options: Record<string, any>, responseDetails: {
          headers: Record<string, string>;
          statusCode: HttpStatusCode;
      }) => void;
      socketPath?: string | null;
      transport?: any;
      httpAgent?: any;
      httpsAgent?: any;
      proxy?: AxiosProxyConfig | false;
      cancelToken?: CancelToken;
      decompress?: boolean;
      transitional?: TransitionalOptions;
      signal?: GenericAbortSignal;
      insecureHTTPParser?: boolean;
      env?: {
          FormData?: new (...args: any[]) => object;
      };
      formSerializer?: FormSerializerOptions;
      family?: AddressFamily;
      lookup?: ((hostname: string, options: object, cb: (err: Error | null, address: LookupAddress | LookupAddress[], family?: AddressFamily) => void) => void) | ((hostname: string, options: object) => Promise<[
          address: LookupAddressEntry | LookupAddressEntry[],
          family?: AddressFamily
      ] | LookupAddress>);
      withXSRFToken?: boolean | ((config: InternalAxiosRequestConfig) => boolean | undefined);
      fetchOptions?: Record<string, any>;
  }

  export type RawAxiosRequestConfig<D = any> = AxiosRequestConfig<D>;

  export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
      headers: AxiosRequestHeaders;
  }

  export interface HeadersDefaults {
      common: RawAxiosRequestHeaders;
      delete: RawAxiosRequestHeaders;
      get: RawAxiosRequestHeaders;
      head: RawAxiosRequestHeaders;
      post: RawAxiosRequestHeaders;
      put: RawAxiosRequestHeaders;
      patch: RawAxiosRequestHeaders;
      options?: RawAxiosRequestHeaders;
      purge?: RawAxiosRequestHeaders;
      link?: RawAxiosRequestHeaders;
      unlink?: RawAxiosRequestHeaders;
  }

  export interface AxiosDefaults<D = any> extends Omit<AxiosRequestConfig<D>, "headers"> {
      headers: HeadersDefaults;
  }

  export interface CreateAxiosDefaults<D = any> extends Omit<AxiosRequestConfig<D>, "headers"> {
      headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
  }

  export interface AxiosResponse<T = any, D = any> {
      data: T;
      status: number;
      statusText: string;
      headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
      config: InternalAxiosRequestConfig<D>;
      request?: any;
  }

  export class AxiosError<T = unknown, D = any> extends Error {
      constructor(message?: string, code?: string, config?: InternalAxiosRequestConfig<D>, request?: any, response?: AxiosResponse<T, D>);
      config?: InternalAxiosRequestConfig<D>;
      code?: string;
      request?: any;
      response?: AxiosResponse<T, D>;
      isAxiosError: boolean;
      status?: number;
      toJSON: () => object;
      cause?: Error;
      static from<T = unknown, D = any>(error: Error | unknown, code?: string, config?: InternalAxiosRequestConfig<D>, request?: any, response?: AxiosResponse<T, D>, customProps?: object): AxiosError<T, D>;
      static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
      static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
      static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
      static readonly ERR_NETWORK = "ERR_NETWORK";
      static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
      static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
      static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
      static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
      static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
      static readonly ERR_CANCELED = "ERR_CANCELED";
      static readonly ECONNABORTED = "ECONNABORTED";
      static readonly ETIMEDOUT = "ETIMEDOUT";
  }

  export class CanceledError<T> extends AxiosError<T> {
  }

  export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;

  export interface CancelStatic {
      new (message?: string): Cancel;
  }

  export interface Cancel {
      message: string | undefined;
  }

  export interface Canceler {
      (message?: string, config?: AxiosRequestConfig, request?: any): void;
  }

  export interface CancelTokenStatic {
      new (executor: (cancel: Canceler) => void): CancelToken;
      source(): CancelTokenSource;
  }

  export interface CancelToken {
      promise: Promise<Cancel>;
      reason?: Cancel;
      throwIfRequested(): void;
  }

  export interface CancelTokenSource {
      token: CancelToken;
      cancel: Canceler;
  }

  export interface AxiosInterceptorOptions {
      synchronous?: boolean;
      runWhen?: (config: InternalAxiosRequestConfig) => boolean;
  }

  export type AxiosRequestInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null, options?: AxiosInterceptorOptions) => number;

  export type AxiosResponseInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null) => number;

  export interface AxiosInterceptorManager<V> {
      use: V extends AxiosResponse ? AxiosResponseInterceptorUse<V> : AxiosRequestInterceptorUse<V>;
      eject(id: number): void;
      clear(): void;
  }

  export class Axios {
      constructor(config?: AxiosRequestConfig);
      defaults: AxiosDefaults;
      interceptors: {
          request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
          response: AxiosInterceptorManager<AxiosResponse>;
      };
      getUri(config?: AxiosRequestConfig): string;
      request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
      get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  }

  export interface AxiosInstance extends Axios {
      <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
      <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      defaults: Omit<AxiosDefaults, "headers"> & {
          headers: HeadersDefaults & {
              [key: string]: AxiosHeaderValue;
          };
      };
  }

  export interface GenericFormData {
      append(name: string, value: any, options?: any): any;
  }

  export interface GenericHTMLFormElement {
      name: string;
      method: string;
      submit(): void;
  }

  export function getAdapter(adapters: AxiosAdapterConfig | AxiosAdapterConfig[] | undefined): AxiosAdapter;

  export function toFormData(sourceObj: object, targetFormData?: GenericFormData, options?: FormSerializerOptions): GenericFormData;

  export function formToJSON(form: GenericFormData | GenericHTMLFormElement): object;

  export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;

  export function spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;

  export function isCancel(value: any): value is Cancel;

  export function all<T>(values: Array<T | Promise<T>>): Promise<T[]>;

  export function mergeConfig<D = any>(config1: AxiosRequestConfig<D>, config2: AxiosRequestConfig<D>): AxiosRequestConfig<D>;

  export interface AxiosStatic extends AxiosInstance {
      create(config?: CreateAxiosDefaults): AxiosInstance;
      Cancel: CancelStatic;
      CancelToken: CancelTokenStatic;
      Axios: typeof Axios;
      AxiosError: typeof AxiosError;
      HttpStatusCode: typeof HttpStatusCode;
      readonly VERSION: string;
      isCancel: typeof isCancel;
      all: typeof all;
      spread: typeof spread;
      isAxiosError: typeof isAxiosError;
      toFormData: typeof toFormData;
      formToJSON: typeof formToJSON;
      getAdapter: typeof getAdapter;
      CanceledError: typeof CanceledError;
      AxiosHeaders: typeof AxiosHeaders;
      mergeConfig: typeof mergeConfig;
  }

  export const axios: AxiosStatic;

  export function dayjs(date?: dayjs.ConfigType): dayjs.Dayjs;

  export function dayjs(date?: dayjs.ConfigType, format?: dayjs.OptionType, strict?: boolean): dayjs.Dayjs;

  export function dayjs(date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs;

  export namespace dayjs {
      interface ConfigTypeMap {
          default: string | number | Date | Dayjs | null | undefined;
      }
      type ConfigType = ConfigTypeMap[keyof ConfigTypeMap];
      interface FormatObject {
          locale?: string;
          format?: string;
          utc?: boolean;
      }
      type OptionType = FormatObject | string | string[];
      type UnitTypeShort = "d" | "D" | "M" | "y" | "h" | "m" | "s" | "ms";
      type UnitTypeLong = "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date";
      type UnitTypeLongPlural = "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years" | "dates";
      type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort;
      type OpUnitType = UnitType | "week" | "weeks" | "w";
      type QUnitType = UnitType | "quarter" | "quarters" | "Q";
      type ManipulateType = Exclude<OpUnitType, "date" | "dates">;
      class Dayjs {
          constructor(config?: ConfigType);
          clone(): Dayjs;
          isValid(): boolean;
          year(): number;
          year(value: number): Dayjs;
          month(): number;
          month(value: number): Dayjs;
          date(): number;
          date(value: number): Dayjs;
          day(): 0 | 1 | 2 | 3 | 4 | 5 | 6;
          day(value: number): Dayjs;
          hour(): number;
          hour(value: number): Dayjs;
          minute(): number;
          minute(value: number): Dayjs;
          second(): number;
          second(value: number): Dayjs;
          millisecond(): number;
          millisecond(value: number): Dayjs;
          set(unit: UnitType, value: number): Dayjs;
          get(unit: UnitType): number;
          add(value: number, unit?: ManipulateType): Dayjs;
          subtract(value: number, unit?: ManipulateType): Dayjs;
          startOf(unit: OpUnitType): Dayjs;
          endOf(unit: OpUnitType): Dayjs;
          format(template?: string): string;
          diff(date?: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number;
          valueOf(): number;
          unix(): number;
          daysInMonth(): number;
          toDate(): Date;
          toJSON(): string;
          toISOString(): string;
          toString(): string;
          utcOffset(): number;
          isBefore(date?: ConfigType, unit?: OpUnitType): boolean;
          isSame(date?: ConfigType, unit?: OpUnitType): boolean;
          isAfter(date?: ConfigType, unit?: OpUnitType): boolean;
          locale(): string;
          locale(preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
      }
      type PluginFunc<T = unknown> = (option: T, c: typeof Dayjs, d: typeof dayjs) => void;
      function extend<T = unknown>(plugin: PluginFunc<T>, option?: T): Dayjs;
      function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string;
      function isDayjs(d: any): d is Dayjs;
      function unix(t: number): Dayjs;
      const Ls: {
          [key: string]: ILocale;
      };
  }

  export interface ThirdPartyPropMap {
      serviceHost: IServiceHost | undefined;
      MessageBox(data: MessageBoxData, parentPid: number, overlay?: boolean): Promise<void>;
      icons: Record<string, string>;
      util: {
          htmlspecialchars: typeof htmlspecialchars;
          Plural: typeof Plural;
          sliceIntoChunks: typeof sliceIntoChunks;
          decimalToHex: typeof decimalToHex;
          sha256: typeof sha256;
          CountInstances: typeof CountInstances;
          join: typeof join;
          getItemNameFromPath: typeof getItemNameFromPath;
          getParentDirectory: typeof getParentDirectory;
          getDriveLetter: typeof getDriveLetter;
          formatBytes: typeof formatBytes;
          DownloadFile: typeof DownloadFile;
          onFileChange: typeof onFileChange;
          onFolderChange: typeof onFolderChange;
      };
      convert: {
          arrayToText: typeof arrayBufferToText;
          textToArrayBuffer: typeof textToArrayBuffer;
          blobToText: typeof blobToText;
          textToBlob: typeof textToBlob;
          arrayToBlob: typeof arrayBufferToBlob;
          blobToDataURL: typeof blobToDataURL;
      };
      workingDirectory: string;
      Process: Constructs<IProcess>;
      AppProcess: Constructs<IAppProcess>;
      ThirdPartyAppProcess: Constructs<IThirdPartyAppProcess>;
      FilesystemDrive: Constructs<IFilesystemDrive>;
      argv: any[];
      app: App;
      $ENTRYPOINT: string;
      $METADATA: string;
      SHELL_PID?: number;
      OPERATION_ID: string;
      load: (path: string) => Promise<any>;
      runApp: (process: Constructs<IAppProcess>, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<IThirdPartyAppProcess | undefined>;
      runAppDirect: (process: Constructs<IAppProcess>, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<IThirdPartyAppProcess | undefined>;
      loadHtml: (path: string) => Promise<string | undefined>;
      loadDirect: (path: string) => Promise<string | undefined>;
      Server: AxiosInstance;
      Debug: (m: any) => void;
      dayjs: (s: string) => dayjs.Dayjs;
      [key: string]: any;
  }

  export function SupplementaryThirdPartyPropFunctions(engine: JsExec): {
      load: (path: string) => Promise<any>;
      runApp: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<ThirdPartyAppProcess | undefined>;
      runAppDirect: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<IThirdPartyAppProcess | undefined>;
      loadHtml: (path: string) => Promise<string | undefined>;
      loadDirect: (path: string) => Promise<void>;
  };

  export function ThirdPartyProps(engine: JsExec): ThirdPartyPropMap;

  export class JsExec extends Process {
      readonly TPA_REVISION = 1;
      props?: ThirdPartyPropMap;
      userDaemon?: IUserDaemon;
      app?: App;
      args: any[];
      metaPath?: string;
      filePath?: string;
      workingDirectory: string;
      operationId: string;
      constructor(pid: number, parentPid: number, filePath: string, ...args: any[]);
      start(): Promise<false | undefined>;
      getTpaUrl(wrapped: string): Promise<string>;
      getTpaPostUrl(): string;
      getTpaUrlInfo(): {
          appId: string;
          userId: string;
          filename: string;
      };
      exec(tpaUrl: string): Promise<any>;
      getContents(): Promise<any>;
      setApp(app: App, metaPath: string): void;
      private wrap;
      testFileContents(unwrapped: string): Promise<void>;
      testFileContents_detectDomReferences(ast: acorn.Program): Promise<{
          documentBody: boolean;
          appRenderer: boolean;
      }>;
  }

  export class JsExecError extends Error {
      constructor(message?: string, options?: ErrorOptions);
  }

  export class LibraryManagement extends BaseService implements ILibraryManagement {
      Index: Map<string, TpaLibrary>;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<void>;
      populateIndex(): Promise<void>;
      deleteLibrary(id: string, onStage?: (stage: string) => void): Promise<boolean>;
      getLibrary<T = any>(id: string): Promise<T>;
  }

  export const libraryManagementService: Service;

  export const KernelLogs: () => LogItem[];

  export const KernelParams: () => URLSearchParams;

  export const KernelInitPid: () => number;

  export const KernelModules: () => string[];

  export const KernelStateHandler: () => IStateHandler | undefined;

  export const KernelIsPanicked: () => boolean;

  export const KernelPremature: () => boolean;

  export const SpawnAppHandler: ProtocolHandler;

  export class ProtocolServiceProcess extends BaseService implements IProtocolServiceProcess {
      lockObserver: boolean;
      observer?: MutationObserver;
      store: Record<string, ProtocolHandler>;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<void>;
      parseProtoParam(): void;
      processMutations(mutations: MutationRecord[]): void;
      parseAnchor(anchor: HTMLAnchorElement): void;
      parseUrl(str: string): ArcProtocol | undefined;
      executeUrl(url: string): Promise<boolean | undefined>;
      registerHandler(command: string, handler: ProtocolHandler): boolean;
      unregisterHandler(command: string): boolean;
  }

  export const protoService: Service;

  export interface IRecentFilesService extends IBaseService {
      loadConfiguration(): Promise<void>;
      writeConfiguration(configuration: string[]): Promise<void>;
      addToRecents(path: string): boolean;
      removeFromRecents(path: string): boolean;
      getRecents(): string[];
  }

  export class RecentFilesService extends BaseService implements IRecentFilesService {
      Configuration: ReadableStore<string[]>;
      readonly CONFIG_PATH: string;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      protected start(): Promise<any>;
      loadConfiguration(): Promise<void>;
      writeConfiguration(configuration: string[]): Promise<void>;
      addToRecents(path: string): boolean;
      removeFromRecents(path: string): boolean;
      getRecents(): string[];
  }

  export const recentFilesService: Service;

  export interface IShareManager extends IBaseService {
      getOwnedShares(): Promise<SharedDriveType[]>;
      mountOwnedShares(): Promise<void>;
      getJoinedShares(): Promise<SharedDriveType[]>;
      createShare(name: string, password: string): Promise<SharedDriveType | undefined>;
      deleteShare(shareId: string): Promise<boolean>;
      changeSharePassword(shareId: string, newPassword: string): Promise<boolean>;
      renameShare(shareId: string, newName: string): Promise<boolean>;
      joinShare(username: string, shareName: string, password: string, mountAlso?: boolean): Promise<boolean | IFilesystemDrive | undefined>;
      leaveShare(shareId: string): Promise<boolean>;
      unmountIfMounted(shareId: string): Promise<void>;
      kickUserFromShare(shareId: string, userId: string): Promise<boolean>;
      mountShare(username: string, shareName: string, letter?: string, onProgress?: FilesystemProgressCallback): Promise<false | IFilesystemDrive | undefined>;
      mountShareById(shareId: string, letter?: string, onProgress?: FilesystemProgressCallback): Promise<false | IFilesystemDrive>;
      getShareMembers(shareId: string): Promise<Record<string, string>>;
      getShareInfoByName(username: string, shareName: string): Promise<SharedDriveType | undefined>;
      getShareInfoById(shareId: string): Promise<SharedDriveType | undefined>;
  }

  export interface ISharedDrive extends IFilesystemDrive {
      shareId?: string;
      shareInfo: SharedDriveType;
  }

  export class SharedDrive extends FilesystemDrive implements ISharedDrive {
      shareId: string | undefined;
      shareInfo: SharedDriveType;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter: string, info: SharedDriveType);
      _spinUp(): Promise<boolean>;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, blob: Blob, onProgress: FilesystemProgressCallback): Promise<boolean>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      stat(path: string): Promise<ExtendedStat | undefined>;
      imageThumbnail(path: string, width: number, height?: number): Promise<string | undefined>;
  }

  export class ShareManager extends BaseService implements IShareManager {
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost);
      protected start(): Promise<any>;
      getOwnedShares(): Promise<SharedDriveType[]>;
      mountOwnedShares(): Promise<void>;
      getJoinedShares(): Promise<SharedDriveType[]>;
      createShare(name: string, password: string): Promise<SharedDriveType | undefined>;
      deleteShare(shareId: string): Promise<boolean>;
      changeSharePassword(shareId: string, newPassword: string): Promise<boolean>;
      renameShare(shareId: string, newName: string): Promise<boolean>;
      joinShare(username: string, shareName: string, password: string, mountAlso?: boolean): Promise<boolean | IFilesystemDrive | undefined>;
      leaveShare(shareId: string): Promise<boolean>;
      unmountIfMounted(shareId: string): Promise<void>;
      kickUserFromShare(shareId: string, userId: string): Promise<boolean>;
      mountShare(username: string, shareName: string, letter?: string, onProgress?: FilesystemProgressCallback): Promise<false | IFilesystemDrive | undefined>;
      mountShareById(shareId: string, letter?: string, onProgress?: FilesystemProgressCallback): Promise<false | IFilesystemDrive>;
      getShareMembers(shareId: string): Promise<Record<string, string>>;
      getShareInfoByName(username: string, shareName: string): Promise<SharedDriveType | undefined>;
      getShareInfoById(shareId: string): Promise<SharedDriveType | undefined>;
  }

  export const shareService: Service;

  export interface TrashIndexNode {
      name: string;
      icon: string;
      originalPath: string;
      deletedPath: string;
      timestamp: number;
  }

  export interface ITrashCanService extends IBaseService {
      INDEX_PATH: string;
      IndexBuffer: ReadableStore<Record<string, TrashIndexNode>>;
      start(): Promise<void>;
      readIndex(): Promise<Record<string, TrashIndexNode>>;
      writeIndex(index: Record<string, TrashIndexNode>): Promise<Record<string, TrashIndexNode>>;
      moveToTrash(path: string, dispatch?: boolean): Promise<TrashIndexNode | undefined>;
      restoreTrashItem(uuid: string): Promise<boolean>;
      getIndex(): Record<string, TrashIndexNode>;
      permanentlyDelete(uuid: string): Promise<boolean>;
      emptyBin(): Promise<void>;
  }

  export class TrashCanService extends BaseService implements ITrashCanService {
      INDEX_PATH: string;
      IndexBuffer: ReadableStore<Record<string, TrashIndexNode>>;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, initBroadcast?: (msg: string) => void);
      start(): Promise<void>;
      readIndex(): Promise<Record<string, TrashIndexNode>>;
      writeIndex(index: Record<string, TrashIndexNode>): Promise<Record<string, TrashIndexNode>>;
      moveToTrash(path: string, dispatch?: boolean): Promise<TrashIndexNode | undefined>;
      restoreTrashItem(uuid: string): Promise<boolean>;
      getIndex(): Record<string, TrashIndexNode>;
      permanentlyDelete(uuid: string): Promise<boolean>;
      emptyBin(): Promise<void>;
  }

  export const trashService: Service;

  export interface MigrationStatusItem {
      caption: string;
      migration: IMigrationNode;
  }

  export interface MigrationResult {
      result: MigrationResultStatus;
      errorMessage?: string;
      successMessage?: string;
      duration?: number;
  }

  export type MigrationResultCollection = Record<number, MigrationResult>;

  export type MigrationStatusCallback = (caption: string) => void;

  export type MigrationResultStatus = "err_ok" | "err_failure" | "err_conflict" | "err_denied" | "err_sameVersion" | "err_noop";

  export interface IMigrationService extends IBaseService {
      get Config(): Record<string, number>;
      MIGRATIONS: IMigrationNodeConstructor[];
      runMigrations(cb?: MigrationStatusCallback): Promise<Record<string, MigrationResult>>;
      runMigration(migration: IMigrationNodeConstructor, cb?: MigrationStatusCallback): Promise<MigrationResult>;
      loadConfiguration(): Promise<Record<string, number>>;
      writeConfiguration(config: Record<string, number>): Promise<Record<string, number>>;
  }

  export interface IMigrationNode {
      svc: IMigrationService;
      _runMigration(cb?: MigrationStatusCallback): Promise<MigrationResult>;
      Log(message: string, level?: LogLevel): Promise<void>;
  }

  export interface IMigrationNodeConstructor extends Constructs<IMigrationNode, [
      IMigrationNodeConstructor,
      IMigrationService
  ]> {
      name: string;
      friendlyName: string;
      inversional: boolean;
      deprecated: boolean;
      version: number;
  }

  export class MigrationNode implements IMigrationNode {
      static name: string;
      static friendlyName: string;
      static inversional: boolean;
      static deprecated: boolean;
      static version: number;
      svc: IMigrationService;
      protected self: IMigrationNodeConstructor;
      constructor(self: IMigrationNodeConstructor, svc: IMigrationService);
      _runMigration(cb?: MigrationStatusCallback): Promise<MigrationResult>;
      runMigration(cb?: MigrationStatusCallback): Promise<MigrationResult>;
      Log(message: string, level?: LogLevel): Promise<void>;
  }

  export class AppShortcutsMigration extends MigrationNode {
      static name: string;
      static friendlyName: string;
      constructor(self: IMigrationNodeConstructor, svc: IMigrationService);
      runMigration(cb?: MigrationStatusCallback): Promise<MigrationResult>;
  }

  export class FileAssociationsMigration extends MigrationNode {
      static name: string;
      static friendlyName: string;
      constructor(self: IMigrationNodeConstructor, svc: IMigrationService);
      runMigration(cb?: MigrationStatusCallback): Promise<MigrationResult>;
  }

  export class IconConfigurationMigration extends MigrationNode {
      static name: string;
      static friendlyName: string;
      constructor(self: IMigrationNodeConstructor, svc: IMigrationService);
      runMigration(): Promise<MigrationResult>;
  }

  export class MigrationService extends BaseService implements IMigrationService {
      private Configuration;
      private CONFIG_PATH;
      MIGRATIONS: IMigrationNodeConstructor[];
      get Config(): Record<string, number>;
      constructor(pid: number, parentPid: number, name: string, host: ServiceHost, broadcast?: (msg: string) => void);
      protected start(): Promise<any>;
      runMigrations(cb?: MigrationStatusCallback): Promise<Record<string, MigrationResult>>;
      runMigration(migration: IMigrationNodeConstructor, cb?: MigrationStatusCallback): Promise<MigrationResult>;
      loadConfiguration(): Promise<Record<string, number>>;
      writeConfiguration(config: Record<string, number>): Promise<Record<string, number>>;
  }

  export const migrationService: Service;

  export class ServiceHost extends Process implements IServiceHost {
      Services: ReadableServiceStore;
      _holdRestart: boolean;
      private _storeLoaded;
      constructor(pid: number, parentPid: number);
      initialRun(broadcast?: (msg: string) => void): Promise<void>;
      spinDown(broadcast?: (msg: string) => void): Promise<void>;
      init(broadcast?: (msg: string) => void): Promise<void>;
      stop(): Promise<void>;
      readonly STORE: Map<string, {
          name: string;
          description: string;
          process: Constructs<IBaseService>;
          startCondition?: (daemon: IUserDaemon) => MaybePromise<boolean>;
          pid?: number;
          id?: string;
          initialState?: InitialServiceState;
          loadedAt?: number;
          changedAt?: number;
      }>;
      loadStore(store: ServiceStore): boolean;
      getServiceInfo(id: string): Service | undefined;
      startService(id: string, broadcast?: (msg: string) => void): Promise<"success" | "err_noExist" | "err_alreadyRunning" | "err_startCondition" | "err_spawnFailed">;
      stopService(id: string, broadcast?: (m: string) => void): Promise<ServiceChangeResult>;
      restartService(id: string): Promise<ServiceChangeResult>;
      verifyServicesProcesses(): Promise<void>;
      getService<T extends IBaseService = IBaseService>(id: string): T | undefined;
      hasService(id: string): boolean;
  }

  export const DefaultUserPreferences: UserPreferences;

  export const DefaultUserInfo: UserInfo;

  export class UserContext implements IUserContext {
      #private;
      constructor(id: string, daemon: IUserDaemon);
      __init(): Promise<void>;
      _init(): Promise<void>;
      __deactivate(): Promise<void>;
      _deactivate(): Promise<void>;
      protected Log(message: string, level?: LogLevel): void;
      protected get serviceHost(): IServiceHost | undefined;
      protected get appStorage(): () => IApplicationStorage | undefined;
      protected get safeMode(): boolean;
      protected get _disposed(): boolean;
      protected get pid(): number;
      protected get userInfo(): UserInfo;
      protected set userInfo(value: UserInfo);
      protected get username(): string;
      protected set username(username: string);
      protected get initialized(): boolean;
      protected set initialized(value: boolean);
  }

  export class AccountUserContext extends UserContext implements IAccountUserContext {
      constructor(id: string, daemon: IUserDaemon);
      discontinueToken(token?: string): Promise<boolean | undefined>;
      getUserInfo(): Promise<UserInfo | undefined>;
      changeUsername(newUsername: string): Promise<boolean>;
      changePassword(newPassword: string): Promise<boolean>;
      getPublicUserInfoOf(userId: string): Promise<PublicUserInfo | undefined>;
      deleteAccount(): Promise<void>;
  }

  export class LoginActivityUserContext extends UserContext implements ILoginActivityUserContext {
      constructor(id: string, daemon: IUserDaemon);
      getLoginActivity(): Promise<LoginActivity[]>;
      logActivity(action: string): Promise<boolean>;
  }

  export function isPopulatable(app: App): boolean;

  export function RegisteredProcess(process: RegisteredProcess): App;

  export class ApplicationsUserContext extends UserContext implements IApplicationsUserContext {
      constructor(id: string, daemon: IUserDaemon);
      spawnAutoload(): Promise<void>;
      checkDisabled(appId: string, noSafeMode?: boolean): boolean;
      isVital(app: App): boolean | undefined;
      isPopulatableByAppIdSync(appId: string): boolean;
      disableApp(appId: string): Promise<false | undefined>;
      enableApp(appId: string): Promise<false | undefined>;
      enableThirdParty(): Promise<void>;
      disableThirdParty(): Promise<void>;
  }

  export class AppRegistrationUserContext extends UserContext implements IAppRegistrationUserContext {
      constructor(id: string, daemon: IUserDaemon);
      getUserApps(): Promise<AppStorage>;
      registerApp(data: InstalledApp): Promise<void>;
      uninstallPackageWithStatus(id: string, deleteFiles?: boolean): Promise<boolean>;
      registerAppFromPath(path: string): Promise<"failed to read file" | "failed to convert to JSON" | "missing properties" | undefined>;
      uninstallAppWithAck(app: App): Promise<boolean>;
      pinApp(appId: string): Promise<void>;
      unpinApp(appId: string): void;
      determineStartMenuShortcutPath(app: App): string | undefined;
      addToStartMenu(appId: string): Promise<void>;
      removeFromStartMenu(appId: string): Promise<void>;
      updateStartMenuFolder(quiet?: boolean): Promise<void>;
      modeUserAppsToFs(): Promise<void>;
  }

  export function lightenColor(color: string, modifier?: number): string;

  export function hex3to6(color: string): string;

  export function darkenColor(color: string, modifier?: number): string;

  export function invertColor(hex: string): string;

  export function bestForeground(bgColor: string): "white" | "black";

  export function getReadableVibrantColor(url: string): Promise<string>;

  export function rgbToHex(r: number, g: number, b: number, a?: number): string;

  export function hexToRgb(hex: string): [
      number,
      number,
      number
  ];

  export function relativeLuminance([r, g, b]: [
      number,
      number,
      number
  ]): number;

  export function getContrastRatio(hex1: string, hex2: string): number;

  export function ensureContrast(hex: string, bg: string, minContrast: number): string;

  export function rgbToHsl(r: number, g: number, b: number): [
      number,
      number,
      number
  ];

  export function hslToRgb(h: number, s: number, l: number): [
      number,
      number,
      number
  ];

  export const Wallpapers: {
      [key: string]: Wallpaper;
  };

  export class AppRendererUserContext extends UserContext implements IAppRendererUserContext {
      constructor(id: string, daemon: IUserDaemon);
      _deactivate(): Promise<void>;
      getAppRendererStyle(accent: string): string;
      setAppRendererClasses(v: UserPreferences): Promise<void>;
      setUserStyleLoader(style: CustomStylePreferences): void;
  }

  export function StoreItemIcon(item: PartialStoreItem | StoreItem): string;

  export function StoreItemIconPrimitive(id: string): string;

  export function StoreItemScreenshot(item: PartialStoreItem | StoreItem, index?: number): string;

  export function StoreItemBanner(item: PartialStoreItem | StoreItem): string;

  export class ChecksUserContext extends UserContext implements IChecksUserContext {
      NIGHTLY: boolean;
      constructor(id: string, daemon: IUserDaemon);
      checkReducedMotion(): void;
      checkForUpdates(): Promise<void>;
      checkForMissedMessages(): Promise<void>;
      checkNightly(): void;
  }

  export class ElevationUserContext extends UserContext implements IElevationUserContext {
      _elevating: boolean;
      private elevations;
      constructor(id: string, daemon: IUserDaemon);
      elevate(id: string): Promise<unknown>;
      manuallyElevate(data: ElevationData): Promise<unknown>;
      loadElevation(id: string, data: ElevationData): void;
  }

  export interface Tab {
      location: string;
      title: string;
      icon: string;
  }

  export interface Location {
      name: string;
      icon: string;
      component: any;
  }

  export type QuotedDrive = {
      data: IFilesystemDrive;
      quota: UserQuota;
  };

  export interface LoadSaveDialogData {
      title: string;
      icon: string;
      startDir?: string;
      isSave?: boolean;
      targetPid?: number;
      extensions?: string[];
      returnId: string;
      saveName?: string;
      multiple?: boolean;
      folder?: boolean;
  }

  export interface FileManagerNotice {
      icon: string;
      text: string;
      className?: string;
  }

  export interface VirtualFileManagerLocation {
      name: string;
      icon: string;
      component: Component;
      hidden?: boolean;
  }

  export interface LegacyConnectionInfo {
      url: string;
      authCode?: string;
      username: string;
      password: string;
  }

  export interface UserDirectory {
      name: string;
      scopedPath: string;
      files: PartialArcFile[];
      directories: PartialUserDir[];
  }

  export interface PartialUserDir {
      name: string;
      scopedPath: string;
  }

  export interface PartialArcFile {
      size?: number;
      mime: string;
      filename: string;
      scopedPath: string;
      dateCreated: number;
      dateModified: number;
  }

  export interface FSQuota {
      username: string;
      max: number;
      free: number;
      used: number;
  }

  export interface ILegacyServerDrive extends IFilesystemDrive {
      TEST_MODES: [
          boolean,
          number
      ][];
      DEFAULT_DIRECTORY: UserDirectory;
      DEFAULT_QUOTA: FSQuota;
      legacy_readDir(path: string): Promise<UserDirectory>;
      legacy_readFile(path: string): Promise<ArrayBuffer | undefined>;
      legacy_testConnection(server: string, authCode?: string): Promise<false | {
          proto: string;
          port: number;
          url: string;
      }>;
      legacy_generateToken(username: string, password: string): Promise<boolean>;
      legacy_quota(): Promise<FSQuota>;
  }

  export interface IMemoryFilesystemDrive extends IFilesystemDrive {
      takeSnapshot(): Promise<Record<string, any>>;
      restoreSnapshot(snapshot: Record<string, any>): void;
  }

  export function toBase64(input: string): string;

  export function fromBase64(input: string): string;

  export class LegacyServerDrive extends FilesystemDrive implements ILegacyServerDrive {
      FILESYSTEM_LONG: string;
      FILESYSTEM_SHORT: string;
      IDENTIFIES_AS: string;
      FIXED: boolean;
      REMOVABLE: boolean;
      READONLY: boolean;
      private connectionInfo;
      private instance?;
      private authorizationHeader?;
      TEST_MODES: [
          boolean,
          number
      ][];
      DEFAULT_DIRECTORY: UserDirectory;
      DEFAULT_QUOTA: FSQuota;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter: string, connection: LegacyConnectionInfo);
      _spinUp(): Promise<boolean>;
      legacy_readDir(path: string): Promise<UserDirectory>;
      legacy_readFile(path: string): Promise<ArrayBuffer | undefined>;
      legacy_testConnection(server: string, authCode?: string): Promise<false | {
          proto: string;
          port: number;
          url: string;
      }>;
      legacy_generateToken(username: string, password: string): Promise<boolean>;
      legacy_quota(): Promise<FSQuota>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      quota(): Promise<UserQuota>;
  }

  export interface GitFolderItem {
      name: string;
      path: string;
      sha: string;
      size: number;
      url: string;
      type: "dir" | "file";
  }

  export type GitFolder = GitFolderItem[];

  export class SourceFilesystemDrive extends FilesystemDrive {
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      label: string;
      FIXED: boolean;
      REMOVABLE: boolean;
      READONLY: boolean;
      HIDDEN: boolean;
      private readonly GIT_BRANCH;
      private readonly GIT_REPO;
      private readonly GIT_API;
      private readonly GIT_RAW;
      private rawClient;
      private apiClient;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter?: string);
      _spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      private getSourceFile;
      private getSourceDirectory;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
  }

  export interface IZipDrive extends IFilesystemDrive {
      _sync(progress?: FilesystemProgressCallback): Promise<void>;
  }

  export class ZIPDrive extends FilesystemDrive implements IZipDrive {
      label: string;
      private _buffer;
      private _path;
      REMOVABLE: boolean;
      READONLY: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter: string, path: string);
      _spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      createDirectory(path: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      _sync(progress?: FilesystemProgressCallback): Promise<void>;
  }

  export class FilesystemUserContext extends UserContext implements IFilesystemUserContext {
      private thumbnailCache;
      TempFs?: IMemoryFilesystemDrive;
      fileHandlers: Record<string, FileHandler>;
      mountedDrives: string[];
      private TempFsSnapshot;
      private get RecentFiles();
      constructor(id: string, daemon: IUserDaemon);
      _init(): Promise<void>;
      _deactivate(): Promise<void>;
      mountZip(path: string, letter?: string, fromSystem?: boolean): Promise<false | IFilesystemDrive | undefined>;
      unmountMountedDrives(): Promise<void>;
      FileProgress(initialData: Partial<FsProgressOperation>, parentPid?: number): Promise<FileProgressMutator>;
      moveMultiple(sources: string[], destination: string, pid: number): Promise<void>;
      copyMultiple(sources: string[], destination: string, pid: number): Promise<void>;
      findHandlerToOpenFile(path: string): Promise<FileOpenerResult[]>;
      getAllFileHandlers(): Promise<FileOpenerResult[]>;
      LoadSaveDialog(data: Omit<LoadSaveDialogData, "returnId">): Promise<string[] | [
          undefined
      ]>;
      openFile(path: string, shortcut?: ArcShortcut): Promise<any>;
      openWith(path: string): Promise<void>;
      determineCategorizedDiskUsage(): Promise<CategorizedDiskUsage>;
      getThumbnailFor(path: string): Promise<string | undefined>;
      mountLegacyFilesystem(connectionInfo: LegacyConnectionInfo): Promise<false | ILegacyServerDrive>;
      moveToTrashOrDeleteItem(path: string, dispatch?: boolean): Promise<boolean>;
      normalizePath(path: string): string;
      mountSourceDrive(): Promise<IFilesystemDrive | false>;
  }

  export class GlobalLoadIndicatorRuntime extends AppProcess {
      caption: ReadableStore<string>;
      progress: ReadableStore<GlobalLoadIndicatorProgress | undefined>;
      constructor(pid: number, parentPid: number, app: AppProcessData, caption: string, progress?: GlobalLoadIndicatorProgress);
      updateProgress(progress: Partial<GlobalLoadIndicatorProgress>): void;
  }

  export const GlobalLoadIndicatorApp: App;

  export class TerminalProcess extends ProcessWithPermissions {
      static keyword: string;
      static description: string;
      static hidden: boolean;
      static allowInterrupt: boolean;
      protected term?: IArcTerminal;
      protected flags?: Arguments;
      protected argv?: string[];
      private exitCode;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
      _main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<any>;
  }

  export const AdminAccessorsDeleteAll: AdminCommandType;

  export const AdminAccessorsDeleteUser: AdminCommandType;

  export const AdminAccessorsListAll: AdminCommandType;

  export const AdminAccessorsListUser: AdminCommandType;

  export const AdminActivitiesDeleteAll: AdminCommandType;

  export const AdminActivitiesDeleteUser: AdminCommandType;

  export const AdminActivitiesListAll: AdminCommandType;

  export const AdminActivitiesListUser: AdminCommandType;

  export const AdminGrant: AdminCommandType;

  export const AdminRevoke: AdminCommandType;

  export function arrayToAsciiTable(arr: string[][] | number[][]): string;

  export const AdminBugHuntReportGet: AdminCommandType;

  export const AdminBugHuntListAll: AdminCommandType;

  export const AdminBugHuntReportClose: AdminCommandType;

  export const AdminBugHuntReportDelete: AdminCommandType;

  export const AdminBugHuntReportOpen: AdminCommandType;

  export const AdminBugHuntStats: AdminCommandType;

  export const AdminHelp: AdminCommandType;

  export const AdminIndexingDelete: AdminCommandType;

  export const AdminIndexingForce: AdminCommandType;

  export const AdminIndexingListAll: AdminCommandType;

  export const AdminIndexingListUser: AdminCommandType;

  export const AdminMount: AdminCommandType;

  export const AdminScopesAdd: AdminCommandType;

  export const AdminScopesAvailable: AdminCommandType;

  export const AdminScopesGet: AdminCommandType;

  export const AdminScopesRemove: AdminCommandType;

  export const AdminServerAuditlog: AdminCommandType;

  export const AdminServerLogs: AdminCommandType;

  export const AdminServerPing: AdminCommandType;

  export const AdminServerStats: AdminCommandType;

  export const AdminShareAccessorsDelete: AdminCommandType;

  export const AdminShareAccessorsList: AdminCommandType;

  export const AdminShareAdduser: AdminCommandType;

  export const AdminShareChangepswdGenerated: AdminCommandType;

  export const AdminShareChangepswdManual: AdminCommandType;

  export const AdminShareChown: AdminCommandType;

  export const AdminShareDelete: AdminCommandType;

  export const AdminShareKick: AdminCommandType;

  export const AdminShareListAll: AdminCommandType;

  export const AdminShareListUser: AdminCommandType;

  export const AdminShareRename: AdminCommandType;

  export const AdminTokensListAll: AdminCommandType;

  export const AdminTokensPurgeAll: AdminCommandType;

  export const AdminTokensPurgeOne: AdminCommandType;

  export const AdminTokensPurgeUser: AdminCommandType;

  export const AdminTotpDeactivate: AdminCommandType;

  export const AdminTotpDelete: AdminCommandType;

  export const AdminTotpGet: AdminCommandType;

  export const AdminTotpListAll: AdminCommandType;

  export const AdminUserApprove: AdminCommandType;

  export const AdminUserChangeemail: AdminCommandType;

  export const AdminUserChangepswdGenerated: AdminCommandType;

  export const AdminUserChangepswdManual: AdminCommandType;

  export const AdminUserDelete: AdminCommandType;

  export const AdminUserDisapprove: AdminCommandType;

  export const AdminUserList: AdminCommandType;

  export const AdminUserPreferencesDelete: AdminCommandType;

  export const AdminUserPreferencesGet: AdminCommandType;

  export const AdminUserPreferencesSet: AdminCommandType;

  export const AdminUserQuotaGet: AdminCommandType;

  export const AdminUserQuotaSet: AdminCommandType;

  export const AdminCommandStore: {
      server: {
          logs: AdminCommandType;
          auditlog: AdminCommandType;
          stats: AdminCommandType;
          ping: AdminCommandType;
      };
      admin: {
          grant: AdminCommandType;
          revoke: AdminCommandType;
          scopes: {
              available: AdminCommandType;
              get: AdminCommandType;
              add: AdminCommandType;
              remove: AdminCommandType;
          };
      };
      tokens: {
          list: {
              all: AdminCommandType;
          };
          purge: {
              all: AdminCommandType;
              one: AdminCommandType;
              user: AdminCommandType;
          };
      };
      bughunt: {
          report: {
              delete: AdminCommandType;
              open: AdminCommandType;
              close: AdminCommandType;
              get: AdminCommandType;
          };
          list: {
              all: AdminCommandType;
          };
          stats: AdminCommandType;
      };
      user: {
          approve: AdminCommandType;
          disapprove: AdminCommandType;
          changeemail: AdminCommandType;
          list: AdminCommandType;
          changepswd: {
              generated: AdminCommandType;
              manual: AdminCommandType;
          };
          preferences: {
              get: AdminCommandType;
              set: AdminCommandType;
              delete: AdminCommandType;
          };
          delete: AdminCommandType;
          quota: {
              get: AdminCommandType;
              set: AdminCommandType;
          };
      };
      mount: AdminCommandType;
      activities: {
          list: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
          delete: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
      };
      totp: {
          list: {
              all: AdminCommandType;
          };
          get: AdminCommandType;
          delete: AdminCommandType;
          deactivate: AdminCommandType;
      };
      "?": AdminCommandType;
      accessors: {
          list: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
          delete: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
      };
      indexing: {
          list: {
              user: AdminCommandType;
              all: AdminCommandType;
          };
          force: AdminCommandType;
          delete: AdminCommandType;
      };
      share: {
          list: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
          delete: AdminCommandType;
          kick: AdminCommandType;
          adduser: AdminCommandType;
          accessors: {
              list: AdminCommandType;
              delete: AdminCommandType;
          };
          changepswd: {
              manual: AdminCommandType;
              generated: AdminCommandType;
          };
          rename: AdminCommandType;
          chown: AdminCommandType;
      };
  };

  export const RESULT_CAPTIONS: Record<number, string>;

  export class AdminCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      static hidden: boolean;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export type AdminCommandType = (term: IArcTerminal, admin: AdminBootstrapper, argv: string[]) => Promise<number>;

  export class AppListCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      main(term: IArcTerminal, flags: Arguments): Promise<1 | 0>;
  }

  export const CAPTIONS: {
      gpu: string;
      cpu: string;
      mem: string;
      net: string;
  };

  export interface DeviceInfo {
      gpu: GPU;
      cpu: CPU;
      mem: Memory;
      net: Network;
  }

  export interface GPU {
      supported: boolean;
      active: boolean;
      vendor: string | undefined;
      model: string | undefined;
  }

  export interface CPU {
      cores: number;
  }

  export interface Network {
      downlink: number;
      effectiveType: string;
      onchange?: Event;
      rtt: number;
      saveData: boolean;
      online: boolean;
  }

  export interface Memory {
      kb: number;
  }

  export function getCPU(): CPU;

  export function getGPU(): GPU;

  export function getMEM(): Memory;

  export const defaultNetwork: Network;

  export function getNET(): Network;

  export function getDeviceInfo(): DeviceInfo;

  export class ArcFetchCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
      getItems(term: IArcTerminal): [
          string,
          string
      ][];
      graphic(term: IArcTerminal): void;
      colorBar(term: IArcTerminal): void;
  }

  export class AtConfCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class CdCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class ClearCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class ConfigCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class CrTpaCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class DevenvCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      commands: Record<string, (term: IArcTerminal, flags: Arguments, argv: string[]) => Promise<number>>;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
      connect(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
      disconnect(term: IArcTerminal): Promise<1 | 0>;
  }

  export class DirCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      static allowInterrupt: boolean;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export const SystemOnlyDispatches: string[];

  export const KnownSystemDispatchers: string[];

  export class DispatchCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments): Promise<number>;
  }

  export class DrivesCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class EchoCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class ExitCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class ExploreCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class SelectionList {
      private terminal;
      private items;
      selectedIndex: number;
      private prompt;
      private resolve;
      private keyListener;
      private visibleItems;
      private scrollOffset;
      private promptLines;
      private scrollIndicatorSpace;
      private isDrawn;
      private totalDrawnLines;
      constructor(terminal: Terminal, items: string[], prompt?: string);
      private calculatePromptLines;
      show(): Promise<string | undefined>;
      private cleanup;
      private updateVisibleItems;
      private ensureSelectionVisible;
      private draw;
      private moveUp;
      private moveDown;
      private moveToTop;
      private moveToBottom;
      private pageUp;
      private pageDown;
      private redraw;
      private clearList;
  }

  export class FindCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class HelpCommand extends TerminalProcess {
      static description: string;
      static keyword: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments): Promise<number>;
  }

  export class HistoryCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class InputCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      static allowInterrupt: boolean;
      constructor(pid: number, parentPid: number);
      main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export const ProcessKillResultCaptions: Record<ProcessKillResult, string>;

  export class KillCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class KlogCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      static allowInterrupt: boolean;
      private eventId;
      constructor(pid: number, parentPid: number);
      main(term: IArcTerminal): Promise<number>;
      stop(): Promise<void>;
  }

  export class LogoutCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class MkdirCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class OpenCommand extends TerminalProcess {
      static description: string;
      static keyword: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class PkgCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      private distrib?;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
      installPackage(name: string): Promise<number>;
      removePackage(name: string): Promise<number>;
      searchPackages(query: string): Promise<number>;
      updateAll(): Promise<number>;
      update(name: string): Promise<number>;
      reinstall(name: string): Promise<number>;
      help(): Promise<number>;
      listAll(): Promise<number>;
      elevate(): Promise<boolean>;
  }

  export class QuotaCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class ReloadCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class RestartCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class RmCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class ShutdownCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      protected main(term: IArcTerminal): Promise<number>;
  }

  export class SpawnCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export function LoginUser(identity: string, password: string): Promise<any>;

  export function RegisterUser(username: string, email: string, password: string): Promise<boolean>;

  export class SudoCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      private retryCount;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, _: Arguments, argv: string[]): Promise<number>;
      execute(term: IArcTerminal, parentArgv: string[]): Promise<any>;
  }

  export class TasksCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class TestCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      static hidden: boolean;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments): Promise<number>;
  }

  export class TreeCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class VerCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(pid: number, parentPid: number);
      protected main(term: IArcTerminal): Promise<number>;
  }

  export const TerminalCommandStore: ITerminalProcessConstructor[];

  export const ESC = "\u001B[";

  export const BLACK = "\u001B[30m";

  export const RED = "\u001B[31m";

  export const GREEN = "\u001B[32m";

  export const YELLOW = "\u001B[33m";

  export const BLUE = "\u001B[34m";

  export const PURPLE = "\u001B[35m";

  export const CYAN = "\u001B[36m";

  export const WHITE = "\u001B[37m";

  export const BRBLACK = "\u001B[90m";

  export const BRRED = "\u001B[91m";

  export const BRGREEN = "\u001B[92m";

  export const BRYELLOW = "\u001B[93m";

  export const BRBLUE = "\u001B[94m";

  export const BRPURPLE = "\u001B[95m";

  export const BRCYAN = "\u001B[96m";

  export const BRWHITE = "\u001B[97m";

  export const RESET = "\u001B[0m";

  export const BOLD = "\u001B[1m";

  export const DIM = "\u001B[2m";

  export const UNDERLINE = "\u001B[4m";

  export const INVERTED = "\u001B[7m";

  export const HIDDEN = "\u001B[8m";

  export const CURUP = "\u001B[1A";

  export const CURDOWN = "\u001B[1B";

  export const CURLEFT = "\u001B[1C";

  export const CURRIGHT = "\u001B[1D";

  export const CLRROW = "\u001B[2K";

  export const DefaultColors: {
      red: string;
      green: string;
      yellow: string;
      blue: string;
      cyan: string;
      magenta: string;
      background: string;
      foreground: string;
      brightBlack: string;
      backdropOpacity: number;
  };

  export const DefaultArcTermConfiguration: ArcTermConfiguration;

  export class TerminalWindowRuntime extends AppProcess implements ITerminalWindowRuntime {
      term: Terminal | undefined;
      overridePopulatable: boolean;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      render(): Promise<void>;
      protected stop(): Promise<void>;
  }

  export const TerminalWindowApp: App;

  export class HelpersUserContext extends UserContext implements IHelpersUserContext {
      constructor(id: string, daemon: IUserDaemon);
      GlobalLoadIndicator(caption?: string, pid?: number, progress?: Partial<GlobalLoadIndicatorProgress>): Promise<{
          caption: ReadableStore<string>;
          stop: () => Promise<void>;
          incrementProgress?: undefined;
          progress?: undefined;
      } | {
          caption: any;
          stop: () => Promise<void>;
          incrementProgress: (amount?: number) => void;
          progress: any;
      }>;
      Confirm(title: string, message: string, no: string, yes: string, image?: string, pid?: number): Promise<unknown>;
      TerminalWindow(pid?: number): Promise<ExpandedTerminal | undefined>;
      IconPicker(data: Omit<IconPickerData, "returnId">): Promise<string | undefined>;
      IconEditor(initialValue: string, defaultIcon?: string, name?: string): Promise<string>;
      ParentIs(proc: IAppProcess, appId: string): boolean | undefined;
      waitForLeaveInvocationAllow(): Promise<void>;
      safeModeNotice(): void;
      iHaveFeedback(process: IAppProcess): void;
  }

  export class IconsUserContext extends UserContext implements IIconsUserContext {
      constructor(id: string, daemon: IUserDaemon);
      getAppIcon(app: App): string;
      getAppIconByProcess(process: IAppProcess): string;
      getIcon(id: string): Promise<string>;
      getIconCached(id: string): string;
      getIconStore(id: string): ReadableStore<string>;
  }

  export class UserDrive extends FilesystemDrive implements IFilesystemDrive {
      private isNightly;
      label: string;
      FIXED: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(uuid: string, letter: string);
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, blob: Blob, onProgress: FilesystemProgressCallback): Promise<boolean>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      stat(path: string): Promise<ExtendedStat | undefined>;
      imageThumbnail(path: string, width: number, height?: number): Promise<string | undefined>;
  }

  export class InitUserContext extends UserContext implements IInitUserContext {
      private registeredAnchors;
      private firstSyncDone;
      anchorInterceptObserver?: MutationObserver;
      constructor(id: string, daemon: IUserDaemon);
      _init(): Promise<void>;
      _deactivate(): Promise<void>;
      startAnchorRedirectionIntercept(): void;
      startFilesystemSupplier(): Promise<void>;
      startDriveNotifierWatcher(): void;
      startPreferencesSync(): Promise<void>;
      startSystemStatusRefresh(): Promise<void>;
      startVirtualDesktops(): Promise<void>;
      startServiceHost(broadcast?: (msg: string) => void): Promise<void>;
      startPermissionHandler(): Promise<boolean>;
  }

  export class NotificationsUserContext extends UserContext implements INotificationsUserContext {
      notifications: Map<string, Notification>;
      constructor(id: string, daemon: IUserDaemon);
      sendNotification(data: Notification): string | undefined;
      deleteNotification(id: string): void;
      clearNotifications(): void;
  }

  export class PowerUserContext extends UserContext implements IPowerUserContext {
      battery: ReadableStore<BatteryType | undefined>;
      constructor(id: string, daemon: IUserDaemon);
      logoff(): Promise<void>;
      shutdown(): Promise<void>;
      restart(): Promise<void>;
      logoffSafeMode(): Promise<void>;
      toLogin(type: string, props?: Record<string, any>, force?: boolean): Promise<void>;
      closeOpenedApps(type: string, props?: Record<string, any>, force?: boolean): Promise<boolean>;
      batteryInfo(): Promise<BatteryType | undefined>;
  }

  export const weatherMetadata: Record<number, WeatherMeta>;

  export const weatherClasses: Record<number, string>;

  export const QuickSettings: QuickSetting[];

  export const DefaultStartMenuActions: string[];

  export const StartMenuActions: Record<string, StartMenuAction>;

  export const DefaultPinnedApps: string[];

  export class PreferencesUserContext extends UserContext implements IPreferencesUserContext {
      syncLock: boolean;
      preferencesUnsubscribe: Unsubscriber | undefined;
      preferences: ReadableStore<UserPreferences>;
      constructor(id: string, daemon: IUserDaemon);
      _deactivate(): Promise<void>;
      commitPreferences(preferences: UserPreferences): Promise<boolean | undefined>;
      sanitizeUserPreferences(): Promise<void>;
      getGlobalSetting(key: string): any;
      setGlobalSetting(key: string, value: any): void;
      changeProfilePicture(newValue: string | number): void;
      uploadProfilePicture(): Promise<string | undefined>;
  }

  export class ShortcutsUserContext extends UserContext implements IShortcutsUserContext {
      constructor(id: string, daemon: IUserDaemon);
      handleShortcut(path: string, shortcut: ArcShortcut): Promise<any>;
      createShortcut(data: ArcShortcut, path: string, dispatch?: boolean): Promise<boolean>;
      newShortcut(location: string): Promise<void>;
  }

  export class SpawnUserContext extends UserContext implements ISpawnUserContext {
      constructor(id: string, daemon: IUserDaemon);
      spawnApp<T extends IProcess>(id: string, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      spawnOverlay<T extends IProcess>(id: string, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      _spawnApp<T extends IProcess>(id: string, renderTarget?: HTMLDivElement | undefined, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      _spawnOverlay<T extends IProcess>(id: string, renderTarget?: HTMLDivElement | undefined, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      spawnThirdParty<T>(app: App, metaPath: string, ...args: any[]): Promise<T | undefined>;
      tpaError_revisionIncompatible(app: App): void;
      tpaError_noEnableThirdParty(): void;
  }

  export class ThemesUserContext extends UserContext implements IThemesUserContext {
      constructor(id: string, daemon: IUserDaemon);
      themeFromUserPreferences(data: UserPreferences, name: string, author: string, version: string): UserTheme;
      saveCurrentTheme(name: string): void;
      applyThemeData(data: UserTheme, id?: string): boolean | undefined;
      applySavedTheme(id: string): void;
      verifyTheme(data: UserTheme): string | undefined;
      checkCurrentThemeIdValidity(data: UserPreferences): UserPreferences;
      deleteUserTheme(id: string): void;
  }

  export class VersionUserContext extends UserContext implements IVersionUserContext {
      constructor(id: string, daemon: IUserDaemon);
      isRegisteredVersionOutdated(): Promise<boolean>;
      updateRegisteredVersion(): Promise<void>;
      checkForNewVersion(): Promise<void>;
      mountSourceDrive(): Promise<IFilesystemDrive | false>;
      enableSourceDrive(openAlso?: boolean): Promise<boolean>;
  }

  export class WallpaperUserContext extends UserContext implements IWallpaperUserContext {
      Wallpaper: ReadableStore<Wallpaper>;
      lastWallpaper: ReadableStore<string>;
      private localWallpaperCache;
      private wallpaperGetters;
      constructor(id: string, daemon: IUserDaemon);
      updateWallpaper(v: UserPreferences): Promise<void>;
      uploadWallpaper(pid?: number): Promise<Wallpaper | undefined>;
      getWallpaper(id: string, override?: string): Promise<Wallpaper>;
      deleteLocalWallpaper(id: string): Promise<boolean>;
      getLocalWallpaper(id: string): Promise<Wallpaper>;
  }

  export class WorkspaceUserContext extends UserContext implements IWorkspaceUserContext {
      private virtualDesktops;
      private virtualDesktopIndex;
      private virtualdesktopChangingTimeout;
      virtualDesktop: HTMLDivElement | undefined;
      constructor(id: string, daemon: IUserDaemon);
      syncVirtualDesktops(v: UserPreferences): Promise<void>;
      renderVirtualDesktop(uuid: string): void;
      deleteVirtualDesktop(uuid: string): Promise<void>;
      getCurrentDesktop(): HTMLDivElement | undefined;
      createWorkspace(name?: string): void;
      getDesktopIndexByUuid(uuid: string): number;
      switchToDesktopByUuid(uuid: string): void;
      killWindowsOfDesktop(uuid: string): Promise<boolean | undefined>;
      nextDesktop(): boolean;
      previousDesktop(): void;
      moveWindow(pid: number, destination: string): Promise<void>;
  }

  export const UserContexts: Record<string, Constructs<IUserContext>>;

  export class UserDaemon extends Process implements IUserDaemon {
      username: string;
      token: string;
      userInfo: UserInfo;
      autoLoadComplete: boolean;
      safeMode: boolean;
      initialized: boolean;
      _blockLeaveInvocations: boolean;
      _toLoginInvoked: boolean;
      _criticalProcess: boolean;
      copyList: ReadableStore<string[]>;
      cutList: ReadableStore<string[]>;
      serviceHost?: ServiceHost;
      get globalDispatch(): IGlobalDispatch | undefined;
      get assoc(): IFileAssocService | undefined;
      get libraries(): ILibraryManagement | undefined;
      account?: IAccountUserContext;
      activity?: ILoginActivityUserContext;
      apps?: IApplicationsUserContext;
      appreg?: IAppRegistrationUserContext;
      renderer?: IAppRendererUserContext;
      checks?: IChecksUserContext;
      elevation?: IElevationUserContext;
      files?: IFilesystemUserContext;
      helpers?: IHelpersUserContext;
      icons?: IIconsUserContext;
      init?: IInitUserContext;
      notifications?: INotificationsUserContext;
      power?: IPowerUserContext;
      preferencesCtx?: IPreferencesUserContext;
      spawn?: ISpawnUserContext;
      themes?: IThemesUserContext;
      version?: IVersionUserContext;
      wallpaper?: IWallpaperUserContext;
      workspaces?: IWorkspaceUserContext;
      shortcuts?: IShortcutsUserContext;
      get preferences(): ReadableStore<import("$types/user").UserPreferences>;
      constructor(pid: number, parentPid: number, token: string, username: string, userInfo?: UserInfo);
      start(): Promise<false | undefined>;
      stop(): Promise<false | undefined>;
      startUserContexts(): Promise<void>;
      stopUserContexts(): Promise<void>;
      checkAdminEnablement(): Promise<void>;
      appStorage(): IApplicationStorage | undefined;
      getShell(): IShellRuntime | undefined;
      updateGlobalDispatch(): void;
  }

  export let Daemon: IUserDaemon;

  export class AppLoadError extends Error {
      name: string;
      constructor(message: string);
  }

  export class AppRuntimeError extends Error {
      name: string;
      constructor(message: string);
  }

  export class AppConfigError extends Error {
      name: string;
      constructor(message: string);
  }

  export class TimingMismatchError extends Error {
      name: string;
      constructor(message: string);
  }

  export class AppRendererError extends Error {
      name: string;
      constructor(message: string);
  }

  export const bannedKeys: string[];

  export class AppProcess extends ProcessWithPermissions implements IAppProcess {
      crashReason: string;
      windowTitle: ReadableStore<string>;
      windowIcon: ReadableStore<string>;
      app: AppProcessData;
      componentMount: Record<string, any>;
      userPreferences: ReadableStore<UserPreferences>;
      username: string;
      shell: IShellRuntime | undefined;
      overridePopulatable: boolean;
      private toastTimeout?;
      toastMessage: ReadableStore<ToastMessage | undefined>;
      safeMode: boolean;
      protected overlayStore: Record<string, App>;
      protected elevations: Record<string, ElevationData>;
      renderArgs: RenderArgs;
      acceleratorStore: AppKeyCombinations;
      readonly contextMenu: AppContextMenu;
      altMenu: ReadableStore<ContextMenuItem[]>;
      windowFullscreen: ReadableStore<boolean>;
      draggable: Draggable | undefined;
      constructor(pid: number, parentPid: number, app: AppProcessData, ...args: any[]);
      onClose(): Promise<boolean>;
      ShowToast(toast: ToastMessage, durationMs?: number): Promise<void>;
      HideToast(): Promise<void>;
      closeWindow(kill?: boolean): Promise<boolean | void>;
      render(args: RenderArgs): MaybePromise<any>;
      __render__(body: HTMLDivElement): Promise<void>;
      CrashDetection(): Promise<void>;
      getSingleton(): this[];
      closeIfSecondInstance(): Promise<this | undefined>;
      getWindow(): HTMLDivElement;
      getBody(): HTMLDivElement;
      hasOverlays(): boolean;
      startAcceleratorListener(): void;
      stopAcceleratorListener(): void;
      __stop(): Promise<any>;
      private processor;
      unfocusActiveElement(): void;
      spawnOverlay(id: string, ...args: any[]): Promise<boolean>;
      spawnApp<T extends IProcess = IAppProcess>(id: string, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      spawnOverlayApp<T extends IProcess = IAppProcess>(id: string, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      elevate(id: string): Promise<unknown>;
      notImplemented(what?: string): void;
      appStore(): IApplicationStorage;
      getIcon(id: string): Promise<string>;
      getIconCached(id: string): string;
      getIconStore(id: string): ReadableStore<string>;
  }

  export interface FsProgressOperation {
      type: "quantity" | "size" | "none";
      icon: string;
      caption: string;
      subtitle: string;
      done: number;
      max: number;
      cancel?: () => void;
      errors: string[];
  }

  export interface FileProgressMutator {
      progress: ReadableStore<FsProgressOperation>;
      mutateMax: (mutator: number) => void;
      mutDone: (mutator: number) => void;
      mutErr: (mutator: string) => void;
      setMax: (value: number) => void;
      setDone: (value: number) => void;
      setErrors: (value: string[]) => void;
      setCancel: (cancel: (() => void) | undefined) => void;
      updateCaption: (caption: string) => void;
      updSub: (subtitle: string) => void;
      stop: () => Promise<any>;
      show: () => Promise<any>;
      setType: (type: "quantity" | "size" | "none") => void;
      process: () => FsProgressProc | undefined;
  }

  export const DummyFileProgress: FileProgressMutator;

  export interface FsProgressProc extends AppProcess {
      Progress: ReadableStore<FsProgressOperation>;
  }

  export interface IFilesystemUserContext extends IUserContext {
      TempFs?: IMemoryFilesystemDrive;
      fileHandlers: Record<string, FileHandler>;
      mountedDrives: string[];
      _init(): Promise<void>;
      _deactivate(): Promise<void>;
      mountZip(path: string, letter?: string, fromSystem?: boolean): Promise<false | IFilesystemDrive | undefined>;
      unmountMountedDrives(): Promise<void>;
      FileProgress(initialData: Partial<FsProgressOperation>, parentPid?: number): Promise<FileProgressMutator>;
      moveMultiple(sources: string[], destination: string, pid: number): Promise<void>;
      copyMultiple(sources: string[], destination: string, pid: number): Promise<void>;
      findHandlerToOpenFile(path: string): Promise<FileOpenerResult[]>;
      getAllFileHandlers(): Promise<FileOpenerResult[]>;
      LoadSaveDialog(data: Omit<LoadSaveDialogData, "returnId">): Promise<string[] | [
          undefined
      ]>;
      openFile(path: string, shortcut?: ArcShortcut): Promise<any>;
      openWith(path: string): Promise<void>;
      determineCategorizedDiskUsage(): Promise<CategorizedDiskUsage>;
      getThumbnailFor(path: string): Promise<string | undefined>;
      mountLegacyFilesystem(connectionInfo: LegacyConnectionInfo): Promise<false | ILegacyServerDrive>;
      moveToTrashOrDeleteItem(path: string, dispatch?: boolean): Promise<boolean>;
      normalizePath(path: string): string;
      mountSourceDrive(): Promise<IFilesystemDrive | false>;
  }

  export interface IUserDaemon extends IProcess {
      username: string;
      token: string;
      userInfo: UserInfo;
      autoLoadComplete: boolean;
      safeMode: boolean;
      initialized: boolean;
      _blockLeaveInvocations: boolean;
      _toLoginInvoked: boolean;
      _criticalProcess: boolean;
      copyList: ReadableStore<string[]>;
      cutList: ReadableStore<string[]>;
      get globalDispatch(): IGlobalDispatch | undefined;
      get assoc(): IFileAssocService | undefined;
      serviceHost?: IServiceHost;
      get libraries(): ILibraryManagement | undefined;
      account?: IAccountUserContext;
      activity?: ILoginActivityUserContext;
      apps?: IApplicationsUserContext;
      appreg?: IAppRegistrationUserContext;
      renderer?: IAppRendererUserContext;
      checks?: IChecksUserContext;
      elevation?: IElevationUserContext;
      files?: IFilesystemUserContext;
      helpers?: IHelpersUserContext;
      icons?: IIconsUserContext;
      init?: IInitUserContext;
      notifications?: INotificationsUserContext;
      power?: IPowerUserContext;
      preferencesCtx?: IPreferencesUserContext;
      spawn?: ISpawnUserContext;
      themes?: IThemesUserContext;
      version?: IVersionUserContext;
      wallpaper?: IWallpaperUserContext;
      workspaces?: IWorkspaceUserContext;
      shortcuts?: IShortcutsUserContext;
      get preferences(): ReadableStore<UserPreferences>;
      start(): Promise<false | undefined>;
      stop(): Promise<false | undefined>;
      startUserContexts(): Promise<void>;
      stopUserContexts(): Promise<void>;
      appStorage(): IApplicationStorage | undefined;
      getShell(): IShellRuntime | undefined;
      updateGlobalDispatch(): void;
      getShell(): IShellRuntime | undefined;
  }

  export interface IUserContext {
      __init(): Promise<void>;
      _init(): Promise<void>;
      __deactivate(): Promise<void>;
      _deactivate(): Promise<void>;
  }

  export interface Service {
      name: string;
      description: string;
      process: Constructs<IBaseService>;
      startCondition?: (daemon: IUserDaemon) => MaybePromise<boolean>;
      pid?: number;
      id?: string;
      initialState?: InitialServiceState;
      loadedAt?: number;
      changedAt?: number;
  }

  export type ServiceStore = Map<string, Service>;

  export type ReadableServiceStore = ReadableStore<ServiceStore>;

  export type InitialServiceState = "stopped" | "started";

  export type ServiceChangeResult = "err_noExist" | "err_alreadyRunning" | "err_notRunning" | "err_startCondition" | "err_spawnFailed" | "err_noManager" | "err_elevation" | "err_managerPaused" | "success";

  export interface IBaseService extends IProcess {
      host: IServiceHost;
      activated: boolean;
      deactivate(broadcast?: (m: string) => void): Promise<void>;
  }

  export interface IServiceHost extends IProcess {
      Services: ReadableServiceStore;
      _holdRestart: boolean;
      initialRun(broadcast?: (m: string) => void): Promise<void>;
      init(broadcast?: (m: string) => void): Promise<void>;
      stop(): Promise<void>;
      readonly STORE: Map<string, Service>;
      loadStore(store: ServiceStore): boolean;
      getServiceInfo(id: string): Service | undefined;
      startService(id: string): Promise<"success" | "err_noExist" | "err_alreadyRunning" | "err_startCondition" | "err_spawnFailed">;
      stopService(id: string): Promise<ServiceChangeResult>;
      restartService(id: string): Promise<ServiceChangeResult>;
      verifyServicesProcesses(): Promise<void>;
      getService<T extends IBaseService = IBaseService>(id: string): T | undefined;
      hasService(id: string): boolean;
      spinDown(broadcast?: (message: string) => void): Promise<void>;
  }

  export interface IApplicationStorage extends IBaseService {
      buffer: ReadableStore<AppStorage>;
      appIconCache: Record<string, string>;
      loadOrigin(id: string, store: AppStoreCb): boolean;
      unloadOrigin(id: string): boolean;
      loadApp(app: App): false | App;
      loadAppModuleFile(path: string): Promise<boolean>;
      injected(): App[];
      refresh(): Promise<void>;
      get(): Promise<AppStorage>;
      getAppSynchronous(id: string): App | undefined;
      getAppById(id: string, fromBuffer?: boolean): Promise<ICommandResult<App>>;
  }

  export interface IAppProcess extends IProcess {
      crashReason: string;
      windowTitle: ReadableStore<string>;
      windowIcon: ReadableStore<string>;
      app: AppProcessData;
      componentMount: Record<string, any>;
      userPreferences: ReadableStore<UserPreferences>;
      username: string;
      shell: IShellRuntime | undefined;
      overridePopulatable: boolean;
      toastMessage: ReadableStore<ToastMessage | undefined>;
      safeMode: boolean;
      renderArgs: RenderArgs;
      acceleratorStore: AppKeyCombinations;
      readonly contextMenu: AppContextMenu;
      altMenu: ReadableStore<ContextMenuItem[]>;
      windowFullscreen: ReadableStore<boolean>;
      draggable: Draggable | undefined;
      onClose(): Promise<boolean>;
      ShowToast(toast: ToastMessage, durationMs?: number): Promise<void>;
      HideToast(): Promise<void>;
      closeWindow(kill?: boolean): Promise<boolean | void>;
      render(args: RenderArgs): MaybePromise<any>;
      __render__(body: HTMLDivElement): Promise<void>;
      CrashDetection(): Promise<void>;
      getSingleton(): this[];
      closeIfSecondInstance(): Promise<this | undefined>;
      getWindow(): HTMLDivElement;
      getBody(): HTMLDivElement;
      hasOverlays(): boolean;
      startAcceleratorListener(): void;
      stopAcceleratorListener(): void;
      __stop(): Promise<any>;
      unfocusActiveElement(): void;
      spawnOverlay(id: string, ...args: any[]): Promise<boolean>;
      spawnApp<T extends IAppProcess = IAppProcess>(id: string, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      spawnOverlayApp<T extends IAppProcess = IAppProcess>(id: string, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      elevate(id: string): Promise<unknown>;
      notImplemented(what?: string): void;
      appStore(): IApplicationStorage;
      getIcon(id: string): Promise<string>;
      getIconCached(id: string): string;
      getIconStore(id: string): ReadableStore<string>;
  }

  export interface App {
      metadata: AppMetadata;
      size: Size;
      minSize: Size;
      maxSize: Size;
      position: MaybeCenteredPosition;
      state: AppState;
      controls: WindowControls;
      assets: AppAssets;
      autoRun?: boolean;
      core?: boolean;
      hidden?: boolean;
      overlay?: boolean;
      glass?: boolean;
      thirdParty?: false;
      id: string;
      originId?: string;
      entrypoint?: string;
      workingDirectory?: string;
      opens?: {
          extensions?: string[];
          mimeTypes?: string[];
      };
      elevated?: boolean;
      acceleratorDescriptions?: Record<string, string>;
      fileSignatures?: Record<string, string>;
      process?: IThirdPartyAppProcess;
      tpaRevision?: number;
      noSafeMode?: boolean;
      vital?: boolean;
      _internalResolvedPath?: string;
      _internalOriginalPath?: string;
      _internalMinVer?: string;
      _internalSysVer?: string;
      _internalLoadTime?: number;
  }

  export type RegisteredProcess = {
      metadata: AppMetadata;
      id: string;
      assets: {
          runtime: Constructs<IProcess>;
      };
      vital?: boolean;
      _internalMinVer?: string;
      hidden?: boolean;
      core?: boolean;
  };

  export interface InstalledApp extends App {
      metadata: AppMetadata;
      tpaPath: string;
  }

  export type ScriptedApp = Omit<App, "assets">;

  export interface AppMetadata {
      name: string;
      version: string;
      author: string;
      icon: string;
      appGroup?: string;
  }

  export interface AppState {
      resizable: boolean;
      minimized: boolean;
      maximized: boolean;
      fullscreen: boolean;
      headless: boolean;
  }

  export interface WindowControls {
      minimize: boolean;
      maximize: boolean;
      close: boolean;
  }

  export interface AppAssets {
      runtime: Constructs<IProcess>;
      component?: typeof SvelteComponent;
  }

  export interface AppComponentProps<T = IAppProcess> {
      process: T;
      pid: number;
      app: App;
      windowTitle: ReadableStore<string>;
      windowIcon: ReadableStore<string>;
  }

  export type Size = {
      w: number;
      h: number;
  };

  export type Position = {
      x: number;
      y: number;
  };

  export type MaybeCenteredPosition = Partial<Position> & {
      centered?: boolean;
  };

  export type AppProcessData = {
      data: App;
      id: string;
      desktop?: string;
  };

  export type AppStorage = ((App | InstalledApp) & {
      originId?: string;
  })[];

  export type AppStoreCb = () => MaybePromise<AppStorage>;

  export interface ContextMenuItem {
      sep?: boolean;
      caption?: string;
      icon?: string;
      image?: string;
      isActive?: ContextMenuCallback<boolean>;
      action?: ContextMenuCallback;
      subItems?: ContextMenuItem[];
      disabled?: ContextMenuCallback<boolean>;
      accelerator?: string;
  }

  export type ContextMenuCallback<T = any> = (...args: any[]) => MaybePromise<T>;

  export type AppContextMenu = {
      [key: string]: ContextMenuItem[];
  };

  export interface ContextMenuInstance {
      x: number;
      y: number;
      items: ContextMenuItem[];
      process?: IAppProcess;
      artificial?: boolean;
      props?: any[];
  }

  export interface WindowResizer {
      className: string;
      cursor: string;
      width: string;
      height: string;
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
  }

  export interface ToastMessage {
      content: string;
      icon?: string;
  }

  export interface IWaveKernel {
      modules: string[];
      Logs: LogItem[];
      PANICKED: boolean;
      startMs: number;
      init: IProcess | undefined;
      state: IStateHandler | undefined;
      initPid: number;
      params: URLSearchParams;
      ARCOS_MODE: string;
      ARCOS_BUILD: string;
      ARCOS_LICENSE: string;
      PREMATURE: boolean;
      _init(): Promise<void>;
      getModule<T = any>(id: string, dontCrash?: boolean): T;
      Log(source: string, message: string, level?: LogLevel): void;
      panic(reason: string, brief?: string): Promise<void>;
  }

  export class changeLogs {
      private CHANGELOG_URL;
      ChangeLogUrls: Record<string, string>;
      ChangeLogCache: Record<string, string>;
      refreshChangelogs(): Promise<false | undefined>;
      parseChangeLogsRepoFile(input: string): Record<string, string>;
      readChangelog(version: string): Promise<string | undefined>;
  }

  export const ChangeLogs: changeLogs;

  export function getLicense(): Promise<void>;

  export const ArcLicense: () => string;

  export const ASCII_ART: string[];

  export const LINES: string[];

  export const EchoIntro: () => void;

  export function Crash(reason: ErrorEvent | PromiseRejectionEvent): void;

  export function handleGlobalErrors(): void;

  export function interceptTpaErrors(stack: string, e: Error): boolean;

  export class MemoryFilesystemDrive extends FilesystemDrive implements IMemoryFilesystemDrive {
      private readonly data;
      FIXED: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_LONG: string;
      FILESYSTEM_SHORT: string;
      HIDDEN: boolean;
      label: string;
      protected CAPABILITIES: Record<DriveCapabilities, boolean>;
      constructor(kernel: any, uuid: string, letter?: string);
      private getPathParts;
      private getEntry;
      private setEntry;
      private deleteEntry;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      direct(path: string): Promise<string | undefined>;
      quota(): Promise<UserQuota>;
      takeSnapshot(): Promise<Record<string, any>>;
      restoreSnapshot(snapshot: Record<string, any>): void;
  }

  export default function TurnedOff(): Promise<void>;

  export interface ParsedStackUrl {
      userId?: string;
      timestamp?: string;
      appId?: string;
      filename?: string;
  }

  export type ParsedStackFrame = StackFrame & {
      parsed?: ParsedStackUrl;
  };

  export class ErrorUtils {
      static URL_REGEX: RegExp;
      static parseStack(e: Error | PromiseRejectionEvent): ParsedStackFrame[];
      static abbreviatedStackTrace(e: Error | PromiseRejectionEvent, prefix?: string): string;
  }

  export function getArcTermStore(term: IArcTerminal): VariableStore;

  export class ArcTermVariables implements IArcTermVariables {
      term: IArcTerminal;
      private store;
      constructor(t: IArcTerminal);
      getAll(): StaticVariableStore;
      get(key: string): string | undefined;
      set(key: string, value: string): Promise<boolean>;
      delete(key: string): Promise<boolean>;
      replace(str: string): string;
      private parseInlineNames;
  }

  export class ArcTerminal extends Process implements IArcTerminal {
      readonly CONFIG_PATH: string;
      path: string;
      drive: IFilesystemDrive | undefined;
      term: Terminal;
      rl: Readline | undefined;
      var: ArcTermVariables | undefined;
      contents: DirectoryReadReturn | undefined;
      daemon: IUserDaemon | undefined;
      ansiEscapes: typeof ansiEscapes;
      lastCommandErrored: boolean;
      lastLine?: string;
      config: ArcTermConfiguration;
      configProvidedExternal: boolean;
      window: ITerminalWindowRuntime | undefined;
      IS_ARCTERM_MODE: boolean;
      constructor(pid: number, parentPid: number, term: Terminal, path?: string, config?: ArcTermConfiguration);
      start(): Promise<false | void>;
      readline(): Promise<void>;
      processLine(text: string | undefined): Promise<void>;
      join(path?: string): string;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean | undefined>;
      writeFile(path: string, data: Blob): Promise<boolean | undefined>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean | undefined>;
      moveItem(source: string, destination: string): Promise<boolean | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      deleteItem(path: string): Promise<boolean | undefined>;
      Error(message: string, prefix?: string): Promise<void>;
      Warning(message: string, prefix?: string): Promise<void>;
      Info(message: string, prefix?: string): Promise<void>;
      changeDirectory(path: string): Promise<boolean | undefined>;
      parseFlags(args: string): [
          Arguments,
          string
      ];
      stop(): Promise<any>;
      elevate(data: ElevationData): Promise<boolean>;
      readConfig(): Promise<void>;
      writeConfig(): Promise<void>;
      reload(): Promise<void>;
      tryGetTermWindow(): void;
      migrateConfigurationPath(): Promise<void>;
      handleCommandError(e: Error, command: Constructs<ITerminalProcess>): void;
  }

  export class TerminalMode extends Process {
      userDaemon?: IUserDaemon;
      target: HTMLDivElement;
      term?: Terminal;
      rl?: Readline;
      arcTerm?: IArcTerminal;
      constructor(pid: number, parentPid: number, target: HTMLDivElement, wrapper: HTMLDivElement);
      start(): Promise<boolean | undefined>;
      initializeTerminal(): Promise<void>;
      proceed(username: string, password: string): Promise<boolean>;
      startDaemon(token: string, username: string): Promise<boolean>;
      private loadToken;
      private validateUserToken;
      resetCookies(): void;
      loginPrompt(): Promise<boolean>;
      private saveToken;
      askForTotp(token: string): Promise<boolean>;
  }

  export default function render(_: StateProps): Promise<void>;

  export default function render(props: StateProps): Promise<void>;

  export default function render(props: StateProps): Promise<void>;

  export default function render(props: StateProps): Promise<void>;

  export default function render(): Promise<void>;

  export const States: Record<string, State>;

  export class StateError extends Error {
      name: string;
      constructor(message: string);
  }

  export class StateHandler extends Process implements IStateHandler {
      store: Record<string, State>;
      currentState: string;
      stateProps: Record<string, Record<any, any>>;
      stateAppProcess: IAppProcess | undefined;
      _criticalProcess: boolean;
      constructor(pid: number, parentPid: number, instanceName: string, store?: Record<string, State>);
      start(): Promise<void>;
      protected stop(): Promise<any>;
      loadState(id: string, props?: Record<string, any>, instant?: boolean): Promise<void>;
      loadStateNormally(id: string, data: State, htmlLoader: HTMLDivElement, cssLoader: HTMLLinkElement): Promise<void>;
      loadStateAsApp(data: State, props: Record<string, any>): Promise<void>;
      getStateLoaders(): {
          htmlLoader: HTMLDivElement;
          cssLoader: HTMLLinkElement;
          main: HTMLDivElement;
      };
  }

  export class InitProcess extends Process {
      _criticalProcess: boolean;
      constructor(pid: number, parentPid?: undefined);
      stop(): Promise<void>;
      jumpstart(): Promise<void>;
      initializeTempFs(): Promise<void>;
      nightly(): void;
  }

  export class KernelModule {
      protected readonly IS_KMOD = true;
      id: string;
      protected state?: IStateHandler;
      constructor(kernel: IWaveKernel, id: string);
      _init(): Promise<void>;
      __init(): Promise<void>;
      protected Log(message: string, level?: LogLevel): void;
      isKmod(): void;
  }

  export const defaultReportOptions: ReportOptions;

  export class BugHunt extends KernelModule implements IBugHunt {
      constructor(kernel: IWaveKernel, id: string);
      _init(): Promise<void>;
      createReport(options?: ReportOptions, app?: App, storeItemId?: string): OutgoingBugReport;
      sendReport(outgoing: OutgoingBugReport, token?: string, options?: ReportOptions): Promise<boolean>;
      getToken(): string;
      getUserBugReports(token: string): Promise<BugReport[]>;
      getPublicBugReports(): Promise<BugReport[]>;
  }

  export class SystemDispatch extends KernelModule implements ISystemDispatch {
      subscribers: Record<string, Record<number, (data: any) => void>>;
      constructor(kernel: IWaveKernel, id: string);
      subscribe<T = any[]>(event: string, callback: (data: T) => void): number;
      unsubscribeId(event: string, id: number): void;
      discardEvent(event: string): void;
      dispatch<T = any[]>(caller: string, data?: T, system?: boolean): SystemDispatchResult;
      _init(): Promise<void>;
  }

  export class FilesystemProxy implements IFilesystemProxy {
      static PROXY_UUID: string;
      uuid: string;
      readonly displayName?: string;
      constructor(uuid: string);
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
  }

  export class MountsFilesystemProxy extends FilesystemProxy {
      static PROXY_UUID: string;
      constructor(uuid: string);
      private parsePath;
      readFile(sourcePath: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      readDir(sourcePath: string): Promise<DirectoryReadReturn | undefined>;
  }

  export class SourceFilesystemProxy extends FilesystemProxy {
      static PROXY_UUID: string;
      readonly displayName?: string | undefined;
      constructor(uuid: string);
      private readonly GIT_BRANCH;
      private readonly GIT_REPO;
      private readonly GIT_API;
      private readonly GIT_RAW;
      private rawClient;
      private apiClient;
      private getSourceFile;
      private getSourceDirectory;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
  }

  export class Filesystem extends KernelModule implements IFilesystem {
      private readonly PROXIES;
      private dispatch;
      drives: Record<string, IFilesystemDrive>;
      loadedProxies: IFilesystemProxy[];
      constructor(kernel: IWaveKernel, id: string);
      _init(): Promise<void>;
      getDriveById(id: string): IFilesystemDrive;
      mountDrive<T = IFilesystemDrive>(id: string, supplier: typeof FilesystemDrive, letter?: string, onProgress?: FilesystemProgressCallback, ...args: any[]): Promise<T | false>;
      getDriveIdByIdentifier(identifier: string): string;
      umountDrive(id: string, fromSystem?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      getDriveByLetter(letter: string, error?: boolean): IFilesystemDrive;
      getDriveIdentifier(path: string): string;
      getDriveByPath(path: string): IFilesystemDrive;
      validatePath(p: string): void;
      removeDriveLetter(p: string): string;
      validateDriveLetter(letter: string): void;
      getProxyInfo(path: string, topLevel?: boolean): FsProxyInfo | undefined;
      tryGetProxyInfo(path: string, topLevel?: boolean): FsProxyInfo | undefined;
      tryHandleProxyReadDir(path: string): Promise<DirectoryReadReturn | undefined>;
      tryHandleProxyReadFile(path: string): Promise<ArrayBuffer | undefined>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      createDirectory(path: string, dispatch?: boolean): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback, dispatch?: boolean): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      moveItem(source: string, destination: string, dispatch?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      private transferFileBetweenDrives;
      deleteItem(path: string, dispatch?: boolean): Promise<boolean>;
      uploadFiles(target: string, accept?: string, multiple?: boolean, onProgress?: FilesystemProgressCallback): Promise<UploadReturn>;
      defaultProgress(d: FilesystemProgress): void;
      lockFile(path: string, pid: number): Promise<void>;
      releaseLock(path: string, pid: number): Promise<void>;
      direct(path: string): Promise<string | undefined>;
      nextAvailableDriveLetter(): string | undefined;
      isDirectory(path: string): Promise<false | DirectoryReadReturn>;
      stat(path: string): Promise<ExtendedStat | undefined>;
      imageThumbnail(path: string, width: number, height?: number): Promise<string | undefined>;
  }

  export type SoundStore = Record<string, any>;

  export type SoundBusStore = {
      [key: string]: HTMLAudioElement[];
  };

  export const ArcSounds: SoundStore;

  export class SoundBus extends KernelModule implements ISoundbus {
      private store;
      private _bus;
      constructor(kernel: IWaveKernel, id: string);
      playSound(id: string, volume?: number): boolean | undefined;
      stopSound(id: string): boolean;
      getStore(): [
          string,
          string
      ][];
      loadExternal(source: string, play?: boolean): void;
  }

  export class Environment extends KernelModule implements IEnvironment {
      private store;
      private readOnlyValues;
      constructor(kernel: IWaveKernel, id: string);
      _init(): Promise<void>;
      set(key: string, value: any): boolean;
      setMultiple(entries: [
          string,
          any
      ][]): void;
      delete(key: string): boolean;
      get(key: string): any;
      getMultiple(keys: string[]): any[];
      setReadonly(key: string): void;
      setWritable(key: string): void;
      reset(): void;
      getAll(): Record<string, string>;
  }

  export const VALIDATION_STR = "thisWonderfulArcOSServerIdentifiedByTheseWordsPleaseDontSteal(c)IzKuipers";

  export class ServerManager extends KernelModule implements IServerManager {
      private get SERVERS_LOCALSTORAGE_KEY();
      private get CURRENT_LOCALSTORAGE_KEY();
      private currentServer?;
      private dispatch;
      connected: boolean;
      serverInfo: ServerInfo | undefined;
      previewBranch?: string;
      servers: ServerOption[];
      get url(): string | undefined;
      get authCode(): string | undefined;
      static isConnected(): boolean;
      static url(): string | undefined;
      constructor(kernel: IWaveKernel, id: string);
      _init(): Promise<void>;
      private testConnection;
      checkUsernameAvailability(username: string): Promise<boolean>;
      checkEmailAvailability(email: string): Promise<boolean>;
      private checkIfPreviewDeployment;
      switchServer(url: string): Promise<boolean>;
      loadServers(): void;
      writeServers(servers: ServerOption[]): void;
      resetServers(): void;
      addServer(config: ServerOption): boolean;
      removeServer(url: string): boolean;
      isAdded(url: string): boolean;
  }

  export class AppRenderer extends Process implements IAppRenderer {
      currentState: number[];
      target: HTMLDivElement;
      maxZIndex: number;
      focusedPid: ReadableStore<number>;
      appStore: ReadableStore<Map<string, AppProcessData>>;
      lastInteract?: IAppProcess;
      _criticalProcess: boolean;
      constructor(pid: number, parentPid: number, target: string);
      protected start(): Promise<void>;
      disposedCheck(): void;
      render(process: IAppProcess, renderTarget: HTMLDivElement | undefined): Promise<void>;
      _windowClasses(proc: IAppProcess, window: HTMLDivElement, data: App): void;
      _windowEvents(proc: IAppProcess, window: HTMLDivElement, titlebar: HTMLDivElement | undefined, data: App): void;
      focusPid(pid: number): void;
      _renderTitlebar(process: IAppProcess): HTMLDivElement | undefined;
      _renderAltMenu(process: IAppProcess): HTMLDivElement;
      _renderToast(process: IAppProcess): HTMLDivElement;
      _resizeGrabbers(process: IAppProcess, window: HTMLDivElement): undefined;
      _resizer(window: HTMLDivElement, resizer: WindowResizer): HTMLDivElement;
      remove(pid: number): Promise<void>;
      toggleMaximize(pid: number): void;
      updateDraggableDisabledState(pid: number, window: HTMLDivElement): void;
      unMinimize(pid: number): void;
      unsnapWindow(pid: number, dispatch?: boolean): void;
      snapWindow(pid: number, variant: string): void;
      toggleMinimize(pid: number): void;
      toggleFullscreen(pid: number): void;
      getAppInstances(id: string, originPid?: number): IAppProcess[];
      notifyCrash(data: App, reason: any, process?: IAppProcess): Promise<void>;
  }

  export class ProcessHandler extends KernelModule implements IProcessHandler {
      private _busy;
      private lastPid;
      store: ReadableStore<Map<number, IProcess>>;
      rendererPid: number;
      renderer: IAppRenderer | undefined;
      processContexts: Map<number, ProcessContext>;
      get IS_BUSY(): boolean;
      get BUSY(): string;
      set BUSY(value: string);
      get MEMORY(): number;
      busyWithNot(thing: string): boolean | "";
      constructor(kernel: IWaveKernel, id: string);
      startRenderer(initPid: number): Promise<void>;
      spawn<T extends IProcess = IProcess>(process: Constructs<T>, renderTarget: HTMLDivElement | undefined, userId: string | undefined, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      getProcessContext(pid: number): ProcessContext | undefined;
      setProcessContext(pid: number, context: ProcessContext): void;
      updateProcessContext(pid: number, cb: (context: ProcessContext) => ProcessContext): Promise<false | undefined>;
      kill(pid: number, force?: boolean): Promise<ProcessKillResult>;
      _killSubProceses(pid: number, force?: boolean): Promise<void>;
      getSubProcesses(parentPid: number): Map<number, IProcess>;
      getProcess<T = IProcess>(pid: number): T | undefined;
      getPid(): number;
      isPid(pid: number): boolean;
      ConnectDispatch(pid: number): IProcessDispatch | undefined;
      waitForAvailable(or?: string): Promise<void>;
  }

  export const KernelModules: Record<string, any>;

  export function prematurePanic(reason?: string): void;

  export class WaveKernel implements IWaveKernel {
      modules: string[];
      PANICKED: boolean;
      Logs: LogItem[];
      startMs: number;
      init: InitProcess | undefined;
      state: IStateHandler | undefined;
      initPid: number;
      params: URLSearchParams;
      ARCOS_MODE: string;
      ARCOS_BUILD: string;
      ARCOS_LICENSE: string;
      PREMATURE: boolean;
      constructor();
      panic(reason: string, brief?: string): Promise<void>;
      _init(): Promise<void>;
      getModule<T = any>(id: string, dontCrash?: boolean): T;
      private _kernelModules;
      Log(source: string, message: string, level?: LogLevel): void;
  }

  export const ArcOSApp: App;

  export interface AdminPortalPage {
      name: string;
      icon: string;
      content: Component<any>;
      hidden?: boolean;
      separator?: boolean;
      scopes?: string[];
      parent?: string;
      props?: (process: IAdminPortalRuntime) => Promise<Record<string, any>> | Record<string, any>;
  }

  export type AdminPortalPages = Map<string, AdminPortalPage>;

  export type PageData = Record<string, any>;

  export type DashboardData = {
      stats: ServerStatistics;
      logs: ServerLogItem[];
  };

  export type QueryData = {
      users: ExpandedUserInfo[];
  };

  export type BugHuntData = {
      users: User[];
      reports: BugReport[];
      stats: ReportStatistics;
  };

  export type ViewBugReportData = {
      report: BugReport;
      quickView?: ReadableStore<string>;
  };

  export type UsersData = {
      users: ExpandedUserInfo[];
  };

  export type ViewUserData = {
      user: ExpandedUserInfo;
      reports: BugReport[];
      osVersion: string;
      migrations: Record<string, number>;
  };

  export type SharesData = {
      shares: SharedDriveType[];
      users: ExpandedUserInfo[];
  };

  export type ViewShareData = {
      share: SharedDriveType;
      accessors: FsAccess[];
      users: ExpandedUserInfo[];
  };

  export type FilesystemsData = {
      users: ExpandedUserInfo[];
  };

  export type StoreData = {
      items: StoreItem[];
      users: ExpandedUserInfo[];
  };

  export type ViewStoreItemData = {
      item: StoreItem;
  };

  export type TokensData = {
      tokens: ExpandedToken[];
      users: ExpandedUserInfo[];
  };

  export type ActivitiesData = {
      activities: Activity[];
      users: ExpandedUserInfo[];
  };

  export type VersioningData = {
      users: ExpandedUserInfo[];
  };

  export type ScopesData = {
      admins: ExpandedUserInfo[];
  };

  export type ViewScopesData = {
      admin: ExpandedUserInfo;
      scopes: Record<string, string>;
  };

  export type AuditLogData = {
      users: ExpandedUserInfo[];
      audits: AuditLog[][];
  };

  export type UsersPageFilters = "all" | "regular" | "admins" | "disapproved" | "online";

  export type SharesPageFilters = "all" | "resized" | "locked";

  export type StorePageFilters = "all" | "official" | "deprecated";

  export interface SpecificAdminAction {
      caption: string;
      scopes: string[];
      className?: string;
      disabled?: (user: UserInfo) => boolean;
      separate?: boolean;
  }

  export type SpecificAdminActions = Record<string, SpecificAdminAction>;

  export interface FilesystemsPageQuota extends Record<string, any> {
      user: ExpandedUserInfo;
      used: number;
      max: number;
      free: number;
      percentage: number;
      unknown?: boolean;
  }

  export interface BugReportFileUrlParseResult extends Record<string, string> {
      appId: string;
      filename: string;
      timestamp: string;
      userId: string;
      url: string;
  }

  export interface BugReportTpaFile {
      unavailable?: boolean;
      filePath: string;
      filename: string;
      size: number;
  }

  export interface VersioningNode {
      os: string;
      migrations: Record<string, number>;
  }

  export interface IAdminPortalRuntime extends IAppProcess {
      ready: ReadableStore<boolean>;
      currentPage: ReadableStore<string>;
      switchPageProps: ReadableStore<Record<string, any>>;
      redacted: ReadableStore<boolean>;
      propSize: ReadableStore<number>;
      shares: IShareManager;
      admin: IAdminBootstrapper;
      start(): Promise<void>;
      switchPage(pageId: string, props?: Record<string, any>, force?: boolean): Promise<void>;
      saveTpaFilesOfBugReport(report: BugReport): Promise<BugReportTpaFile[]>;
      viewUserById(userId: string): Promise<void>;
  }

  export function FileMenu(process: IAdminPortalRuntime): ContextMenuItem;

  export const AdminPortalPageStore: AdminPortalPages;

  export const LogoTranslations: Record<string, string>;

  export const specificAdminActions: SpecificAdminActions;

  export const globalAdminActions: SpecificAdminActions;

  export const DefaultTotpInfo: PartialUserTotp;

  export const DefaultTokenInfo: Token;

  export function PageMenu(process: IAdminPortalRuntime): ContextMenuItem;

  export function ToolsMenu(runtime: IAdminPortalRuntime): ContextMenuItem;

  export function AdminPortalAltMenu(process: IAdminPortalRuntime): ContextMenuItem[];

  export class BugHuntUserDataRuntime extends AppProcess {
      data: UserInfo;
      hljs: HLJSApi;
      html: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, data: UserInfo);
  }

  export const BugHuntUserDataApp: App;

  export class AdminPortalRuntime extends AppProcess implements IAdminPortalRuntime {
      ready: ReadableStore<boolean>;
      currentPage: ReadableStore<string>;
      switchPageProps: ReadableStore<Record<string, any>>;
      redacted: ReadableStore<boolean>;
      propSize: ReadableStore<number>;
      shares: ShareManager;
      admin: AdminBootstrapper;
      protected overlayStore: Record<string, App>;
      constructor(pid: number, parentPid: number, app: AppProcessData, page?: string, props?: Record<string, any>);
      start(): Promise<void>;
      switchPage(pageId: string, props?: Record<string, any>, force?: boolean): Promise<void>;
      saveTpaFilesOfBugReport(report: BugReport): Promise<BugReportTpaFile[]>;
      viewUserById(userId: string): Promise<void>;
  }

  export const AdminPortalApp: App;

  export function FileManagerAccelerators(runtime: FileManagerRuntime): AppKeyCombinations;

  export function EditMenu(runtime: FileManagerRuntime): ContextMenuItem;

  export function FileMenu(runtime: FileManagerRuntime): ContextMenuItem;

  export function GoMenu(runtime: FileManagerRuntime): ContextMenuItem;

  export function ViewMenu(runtime: FileManagerRuntime): ContextMenuItem;

  export function FileManagerAltMenu(runtime: FileManagerRuntime): ContextMenuItem[];

  export function FileManagerContextMenu(runtime: FileManagerRuntime): AppContextMenu;

  export class FileManagerRuntime extends AppProcess {
      path: ReadableStore<string>;
      contents: ReadableStore<DirectoryReadReturn | undefined>;
      shortcuts: ReadableStore<ShortcutStore>;
      loading: ReadableStore<boolean>;
      errored: ReadableStore<boolean>;
      selection: ReadableStore<string[]>;
      starting: ReadableStore<boolean>;
      rootFolders: ReadableStore<FolderEntry[]>;
      drives: ReadableStore<Record<string, QuotedDrive>>;
      notice: ReadableStore<FileManagerNotice | undefined>;
      showNotice: ReadableStore<boolean>;
      loadSave: LoadSaveDialogData | undefined;
      saveName: ReadableStore<string>;
      virtual: ReadableStore<VirtualFileManagerLocation | undefined>;
      drive: ReadableStore<IFilesystemDrive | undefined>;
      directoryListing: ReadableStore<HTMLDivElement>;
      virtualLocations: Record<string, VirtualFileManagerLocation>;
      private _refreshLocked;
      contextMenu: AppContextMenu;
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string, loadSave?: LoadSaveDialogData);
      render({ path }: RenderArgs): Promise<void>;
      navigate(path: string): Promise<void>;
      refresh(): Promise<void>;
      lockRefresh(): void;
      unlockRefresh(refresh?: boolean): void;
      parentDir(): void;
      updateDrives(): Promise<void>;
      unmountDrive(drive: IFilesystemDrive, id: string): void;
      confirmUmountDrive(drive: IFilesystemDrive, id: string): Promise<void>;
      updateAltMenu(): void;
      updateRootFolders(): Promise<void>;
      updateNotice(): Promise<void>;
      setCopyFiles(files?: string[]): void;
      setCutFiles(files?: string[]): void;
      pasteFiles(): Promise<void>;
      uploadItems(): Promise<void>;
      openFile(path: string): Promise<void>;
      createShortcut(name: string, path: string, folder?: boolean): Promise<void>;
      deleteSelected(): Promise<void>;
      confirmDeleteSelected(isUserFs?: boolean): Promise<void>;
      downloadSelected(): Promise<false | undefined>;
      singlefySelected(): void;
      updateSelection(e: MouseEvent, path: string): void;
      selectorUp(): Promise<void>;
      selectorDown(): Promise<void>;
      EnterKey(alternative?: boolean): Promise<void>;
      isDirectory(path: string, workingPath?: string): boolean | undefined;
      shareAccessIsAdministrative(drive: IFilesystemDrive): boolean;
      DirectoryNotFound(): void;
      SystemFolderDeletionRestricted(userPathKey: string): void;
      confirmLoadSave(): Promise<void>;
      setupLoadSave(loadSave?: LoadSaveDialogData | undefined): void;
      handleVirtualLocation(path: string): void;
  }

  export type QuerySourceKey = (typeof QuerySources)[number];

  export interface QueryDesignation {
      scopes?: AdminScopesType[];
      obtainer: () => MaybePromise<any[]>;
  }

  export interface QueryExpression {
      columnName?: string;
      comparisonType?: QueryComparisonTypesType;
      comparisonValue?: string | boolean;
      hierarchyValue?: any;
  }

  export type QueryExpressionsType = Record<QuerySourceKey, QueryExpression[]>;

  export type QueryDesignationsType = Record<QuerySourceKey, QueryDesignation>;

  export type QueryComparisonTypesType = (typeof QueryComparisonTypes)[number];

  export type SavedQuery = {
      selectedSource: QuerySourceKey;
      expressions: QueryExpressionsType;
  };

  export const QuerySources: readonly [
      "",
      "users",
      "tokens",
      "totp",
      "reports",
      "shares",
      "indexes",
      "activities",
      "logs",
      "auditlog"
  ];

  export const QueryComparisonTypes: readonly [
      "",
      "is equal to",
      "is not equal to",
      "includes",
      "does not include",
      "is defined",
      "is not defined",
      "is boolean",
      "is greater than",
      "is greater than or equal to",
      "is less than",
      "is less than or equal to"
  ];

  export const QueryUserColumns: string[];

  export const EmptyQueryDesignation: QueryDesignation;

  export function QueryDesignations(runtime: ExecuteQueryRuntime): QueryDesignationsType;

  export function ExecuteQueryAltMenu(runtime: ExecuteQueryRuntime): ContextMenuItem[];

  export class LoadQueryOverlayRuntime extends AppProcess {
      parent: ExecuteQueryRuntime;
      queries: string[];
      selectedQuery: ReadableStore<string>;
      constructor(pid: number, parentPid: number, app: AppProcessData, parent: ExecuteQueryRuntime);
      start(): Promise<void>;
      Confirm(): Promise<void>;
  }

  export const LoadQueryOverlayApp: App;

  export class SaveQueryOverlayRuntime extends AppProcess {
      parent: ExecuteQueryRuntime;
      queryName: ReadableStore<string>;
      constructor(pid: number, parentPid: number, app: AppProcessData, parent: ExecuteQueryRuntime);
      Confirm(): Promise<void>;
  }

  export const SaveQueryOverlayApp: App;

  export class ExecuteQueryRuntime extends AppProcess {
      result: ReadableStore<any[]>;
      dataSource: ReadableStore<any[]>;
      selectedSource: ReadableStore<"" | "tokens" | "users" | "indexes" | "activities" | "shares" | "logs" | "reports" | "totp" | "auditlog">;
      loading: ReadableStore<boolean>;
      truncated: ReadableStore<boolean>;
      totalCount: ReadableStore<number>;
      columns: ReadableStore<string[]>;
      columnTypes: ReadableStore<string[]>;
      expressions: ReadableStore<QueryExpressionsType>;
      admin: AdminBootstrapper;
      users: ExpandedUserInfo[];
      readonly queryDesignations: QueryDesignationsType;
      protected overlayStore: Record<string, App>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      stop(): Promise<void>;
      render(): Promise<void>;
      updateResult(key: QuerySourceKey): Promise<void>;
      updateColumnTypes(items?: any[]): void;
      executeQuery(): Promise<void>;
      evaluateExpression(item: any, expression: QueryExpression): boolean;
      comparison_isEqualTo(value: any, { comparisonValue, hierarchyValue }: QueryExpression, valueIsObject?: boolean): boolean;
      comparison_isNotEqualTo(value: any, { comparisonValue, hierarchyValue }: QueryExpression, valueIsObject?: boolean): boolean;
      comparison_includes(value: any, { comparisonValue, hierarchyValue }: QueryExpression, valueIsObject?: boolean): any;
      comparison_doesNotInclude(value: any, { comparisonValue, hierarchyValue }: QueryExpression, valueIsObject?: boolean): boolean;
      comparison_isDefined(value: any): boolean;
      comparison_isNotDefined(value: any): boolean;
      comparison_isBoolean(value: any, { comparisonValue }: QueryExpression): boolean;
      comparison_isLessThan(value: any, { comparisonValue }: QueryExpression): boolean;
      comparison_isLessThanOrEqualTo(value: any, { comparisonValue }: QueryExpression): boolean;
      comparison_isGreaterThan(value: any, { comparisonValue }: QueryExpression): boolean;
      comparison_isGreaterThanOrEqualTo(value: any, { comparisonValue }: QueryExpression): boolean;
      duplicateExpression(index: number): void;
      deleteExpression(index: number): void;
      addExpression(): void;
      exportResults(): Promise<void>;
      loadQueryDialog(): Promise<boolean>;
      saveQueryDialog(): Promise<boolean>;
      loadQueryList(): Promise<string[]>;
      saveQuery(name: string, data?: QueryExpressionsType): Promise<void>;
      loadQuery(name: string): Promise<boolean>;
      deleteQuery(name: string): Promise<boolean>;
      normalizeQueryPath(name: string): string;
      noAccessToSource(): void;
      findMostColumnsOf(input: any[]): string[];
  }

  export const ExecuteQueryApp: App;

  export class AcceleratorOverviewRuntime extends AppProcess {
      KnownAcceleratorKeys: string[];
      store: ReadableStore<[
          string,
          [
              string[],
              string
          ][]
      ][]>;
      apps: ReadableStore<AppStorage>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      splitAcceleratorString(accelerator: string): string[];
  }

  export const AcceleratorOverviewApp: App;

  export class AddServerRuntime extends AppProcess {
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      stop(): Promise<void>;
      render(): Promise<void>;
      addServer(hostname: string, port: number, authCode?: string): Promise<void>;
      createServerUrl(hostname: string, port: number): string;
      private callServer;
      testServer(hostname: string, port: number, authCode?: string): Promise<void>;
  }

  export const AddServerApp: App;

  export class AppInfoRuntime extends AppProcess {
      targetApp: ReadableStore<App>;
      targetAppId: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, appId: string);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      killAll(): Promise<void>;
      openPermissions(): Promise<void>;
      processManager(): Promise<void>;
  }

  export const AppInfoApp: App;

  export class AppInstallerRuntime extends AppProcess {
      progress?: IInstallerProcessBase;
      metadata?: ArcPackage;
      isLibrary: boolean;
      zip?: JSZip;
      constructor(pid: number, parentPid: number, app: AppProcessData, metadata: ReadableStore<ArcPackage>, zip: JSZip);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      revert(): Promise<void>;
      runNow(): void;
      go(): Promise<void>;
  }

  export const AppInstallerApp: App;

  export type InstallStatusType = "mkdir" | "file" | "registration" | "other";

  export type InstallStatusMode = "done" | "failed" | "working";

  export interface InstallStatusItem {
      type: InstallStatusType;
      status: InstallStatusMode;
      content: string;
  }

  export type InstallStatus = Record<string, InstallStatusItem>;

  export class AppPermissionsRuntime extends AppProcess {
      targetApp: ReadableStore<App>;
      targetAppId: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, appId: string);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
  }

  export const AppPermissionsApp: App;

  export class AppPreInstallRuntime extends AppProcess {
      pkgPath: string;
      zip: JSZip | undefined;
      metadata: ReadableStore<ArcPackage>;
      constructor(pid: number, parentPid: number, app: AppProcessData, pkgPath: string);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      fail(reason: string): void;
      install(): Promise<void>;
  }

  export const AppPreinstallApp: App;

  export class ArcFindRuntime extends AppProcess implements IArcFindRuntime {
      private fileSystemIndex;
      private searchItems;
      loading: ReadableStore<boolean>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<false | undefined>;
      stop(): Promise<void>;
      refresh(): Promise<SearchItem[] | undefined>;
      getFilesystemSearchSupplier(preferences: UserPreferences): Promise<SearchItem[]>;
      getAppSearchSupplier(preferences: UserPreferences): Promise<SearchItem[]>;
      getFlatTree(): Promise<PathedFileEntry[]>;
      Search(query: string): Promise<{
          id: string;
          item: SearchItem;
          refIndex: number;
          score?: number;
          matches?: ReadonlyArray<FuseResultMatch>;
      }[]>;
  }

  export const ArcFind: App;

  export interface ArcTermColors {
      red: string;
      green: string;
      yellow: string;
      blue: string;
      cyan: string;
      magenta: string;
      foreground: string;
      background: string;
      brightBlack: string;
      backdropOpacity: number;
  }

  export interface ArcTermColorPreset extends ArcTermColors {
      name: string;
      author: string;
      variant: "light" | "dark";
  }

  export class ArcTermColorsRuntime extends AppProcess {
      CONFIG_PATH: string;
      arcTermConfiguration: ReadableStore<ArcTermConfiguration>;
      mode: ReadableStore<"custom" | "presets">;
      changed: ReadableStore<boolean>;
      savePath?: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string);
      start(): Promise<void>;
      stop(): Promise<void>;
      render(): Promise<void>;
      writeDefaultConfiguration(): Promise<void>;
      customFromPreset(preset: ArcTermColorPreset): void;
      choosePreset(preset: ArcTermColorPreset): void;
      savePresetToFile(state?: ArcTermConfiguration): Promise<void>;
      openPreset(): Promise<void>;
      readPresetFromFile(path?: string | undefined): Promise<boolean | undefined>;
      applyConfiguration(): Promise<void>;
      readConfiguration(): Promise<void>;
      error_savePath(): Promise<boolean>;
  }

  export const ArcTermColorsApp: App;

  export const DarkColorPresets: ArcTermColorPreset[];

  export const LightColorPresets: ArcTermColorPreset[];

  export const ArcTermColorPresets: ArcTermColorPreset[];

  export const ContextMenuApp: App;

  export class DriveInfoRuntime extends AppProcess {
      drive?: IFilesystemDrive;
      isUserFs: boolean;
      usage?: CategorizedDiskUsage;
      quota?: UserQuota;
      constructor(pid: number, parentPid: number, app: AppProcessData, drive: IFilesystemDrive);
      start(): Promise<false | undefined>;
  }

  export const DriveInfoApp: App;

  export interface ExitAction {
      caption: string;
      action: (daemon: IUserDaemon) => void;
      alternateAction?: (daemon: IUserDaemon) => void;
      alternateCaption?: string;
      icon: string;
  }

  export const ExitActions: Record<string, ExitAction>;

  export class ExitRuntime extends AppProcess {
      selected: ReadableStore<string>;
      constructor(pid: number, parentPid: number, app: AppProcessData, selected?: string);
      go(action: ExitAction | undefined, alternate?: boolean): Promise<void>;
  }

  export const ExitApp: App;

  export const ChooseProfilePictureApp: App;

  export interface FirstRunPage {
      name: string;
      component: any;
      hero?: boolean;
      actions: {
          left: Action[];
          right: Action[];
      };
  }

  export interface Action {
      caption: string;
      suggested?: boolean;
      disabled?: boolean;
      action: (process: FirstRunRuntime) => void;
  }

  export interface FirstRunTheme {
      name: string;
      subtitle: string;
      image: string;
      configuration: {
          style: string;
          wallpaper: string;
          accent: string;
      };
  }

  export const FirstRunPages: Map<string, FirstRunPage>;

  export const FirstRunThemes: Record<string, FirstRunTheme>;

  export const FirstRunShortcuts: Record<string, ArcShortcut>;

  export class FirstRunRuntime extends AppProcess {
      done: ReadableStore<boolean>;
      currentPage: ReadableStore<FirstRunPage>;
      protected overlayStore: Record<string, App>;
      constructor(pid: number, parentPid: number, app: AppProcessData, daemon: IUserDaemon);
      render(): Promise<void>;
      onClose(): Promise<boolean>;
      switchPage(id: string): void;
      chooseProfilePicture(): void;
  }

  export const FirstRunApp: App;

  export class NewFileRuntime extends AppProcess {
      newFile: ReadableStore<string>;
      path: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, path: string);
      render(): void;
      createFile(): Promise<void>;
  }

  export const FsNewFileApp: App;

  export class NewFolderRuntime extends AppProcess {
      newFolder: ReadableStore<string>;
      path: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, path: string);
      render(): void;
      createFolder(): Promise<void>;
  }

  export const FsNewFolderApp: App;

  export class FsProgressRuntime extends AppProcess {
      Progress: ReadableStore<FsProgressOperation>;
      constructor(pid: number, parentPid: number, app: AppProcessData, store: ReadableStore<FsProgressOperation>);
      render({ store }: {
          store: ReadableStore<FsProgressOperation>;
      }): Promise<boolean | void> | undefined;
      onClose(): Promise<boolean>;
  }

  export const FsProgressApp: App;

  export class FsProgressFailRuntime extends AppProcess {
      prog?: FsProgressProc;
      errors: string[];
      icon: string;
      title: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, prog: FsProgressProc);
      start(): Promise<false | undefined>;
  }

  export const FsProgressFailApp: App;

  export class RenameItemRuntime extends AppProcess {
      newName: ReadableStore<string>;
      parentDir: string;
      path: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, path: string);
      render(): void;
      rename(): Promise<void>;
  }

  export const FsRenameItemApp: App;

  export class IconEditDialogRuntime extends AppProcess {
      iconName?: string;
      returnId?: string;
      type: ReadableStore<string>;
      values: ReadableStore<Record<string, string>>;
      currentIcon: ReadableStore<string>;
      defaultIcon?: string;
      sent: boolean;
      constructor(pid: number, parentPid: number, app: AppProcessData, returnId?: string, initialValue?: string, name?: string, defaultIcon?: string);
      start(): Promise<false | undefined>;
      updateCurrentIcon(type?: string, values?: Record<string, any>): Promise<void>;
      default(): void;
      save(): void;
      stop(): Promise<void>;
  }

  export const IconEditDialogApp: App;

  export class IconPickerRuntime extends AppProcess {
      forWhat?: string;
      defaultIcon?: string;
      selected: ReadableStore<string>;
      groups: Record<string, Record<string, string>>;
      store: Record<string, string>;
      returnId?: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, data: IconPickerData);
      start(): Promise<false | undefined>;
      confirm(): Promise<void>;
      cancel(): Promise<void>;
      selectRandom(): void;
  }

  export const IconPickerApp: App;

  export const ICON_GROUP_CAPTIONS: {
      Branding: string;
      General: string;
      Apps: string;
      Filesystem: string;
      Power: string;
      Dialog: string;
      Status: string;
      Mimetypes: string;
  };

  export interface ItemInfo {
      meta: {
          sort: "file" | "folder";
          mimetype?: string;
          size?: number;
          created: string;
          modified: string;
      };
      location: {
          fullPath: string;
          extension?: string;
          parent?: string;
          drive?: string;
          driveFs?: string;
      };
      isFolder: boolean;
      isShortcut: boolean;
      name: string;
  }

  export class ItemInfoRuntime extends AppProcess {
      info: ReadableStore<ItemInfo>;
      shortcut: ReadableStore<ArcShortcut>;
      constructor(pid: number, parentPid: number, app: AppProcessData, path: string, file: FileEntry | FolderEntry);
      start(): Promise<false | undefined>;
      render({ path, file }: RenderArgs): Promise<void>;
      open(): Promise<void>;
      openWith(path: string): Promise<void>;
      renameItem(): Promise<void>;
  }

  export const ItemInfoApp: App;

  export interface Attachment {
      data: File;
      uuid: string;
  }

  export class MessageComposerRuntime extends AppProcess {
      sending: ReadableStore<boolean>;
      recipients: ReadableStore<string[]>;
      attachments: ReadableStore<Attachment[]>;
      title: ReadableStore<string>;
      body: ReadableStore<string>;
      replyId: string | undefined;
      service: MessagingInterface;
      constructor(pid: number, parentPid: number, app: AppProcessData, initialData?: MessageCreateData, replyId?: string);
      send(): Promise<void>;
      discard(): Promise<boolean | void>;
      sendFailed(): void;
      addAttachment(): Promise<void>;
      filesToAttachments(...files: File[]): Attachment[];
      removeAttachment(uuid: string): void;
      removeRecipient(recipient: string): void;
      isModified(): number;
  }

  export const MessageComposerApp: App;

  export interface MultiUpdateStatusNode {
      state: "pending" | "working" | "success" | "failed" | "downloading";
      max: number;
      done: number;
      pkg: StoreItem;
  }

  export const StateIconTranslations: Record<string, string>;

  export type MultiUpdateStatus = MultiUpdateStatusNode[];

  export class MultiUpdateGuiRuntime extends AppProcess {
      private updates;
      private distrib;
      private win;
      status: ReadableStore<MultiUpdateStatus>;
      currentPackage: ReadableStore<StoreItem | undefined>;
      working: ReadableStore<boolean>;
      done: ReadableStore<boolean>;
      errored: ReadableStore<string[]>;
      logs: ReadableStore<Record<string, InstallStatus>>;
      focused: ReadableStore<string>;
      showLog: ReadableStore<boolean>;
      unified: ReadableStore<boolean>;
      constructor(pid: number, parentPid: number, app: AppProcessData, updates: UpdateInfo[]);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      onClose(): Promise<boolean>;
      updatePackageStatus(appId: string, newData: Partial<MultiUpdateStatusNode>): void;
      packageFailed(appId: string): void;
      go(): Promise<void>;
      checkForErrors(): void;
      mainAction(): void;
      toggleLog(): void;
  }

  export const MultiUpdateGuiApp: App;

  export class OopsNotifierRuntime extends AppProcess {
      data: App;
      exception: Error | PromiseRejectionEvent;
      process?: IAppProcess;
      installed: boolean;
      parseFailed: boolean;
      stackFrames: ParsedStackFrame[];
      constructor(pid: number, parentPid: number, app: AppProcessData, data: App, exception: Error | PromiseRejectionEvent, process?: IAppProcess);
      start(): Promise<void>;
      details(): Promise<void>;
      reopen(): Promise<void>;
  }

  export const OopsNotifierApp: App;

  export class OopsStackTracerRuntime extends AppProcess {
      data: App;
      proc?: IAppProcess;
      exception: Error | PromiseRejectionEvent;
      stackFrames: ParsedStackFrame[];
      trace: string;
      string: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, data: App, exception: Error | PromiseRejectionEvent, process: IAppProcess | undefined, stackFrames: ParsedStackFrame[]);
  }

  export const OopsStackTracerApp: App;

  export class OpenWithRuntime extends AppProcess {
      available: ReadableStore<FileOpenerResult[]>;
      all: ReadableStore<FileOpenerResult[]>;
      apps: ReadableStore<FileOpenerResult[]>;
      filename: ReadableStore<string>;
      path: ReadableStore<string>;
      selectedId: ReadableStore<string>;
      viewMode: ReadableStore<"all" | "apps" | "compatible">;
      constructor(pid: number, parentPid: number, app: AppProcessData, path: string);
      start(): Promise<false | undefined>;
      render({ path }: RenderArgs): Promise<void>;
      go(id?: string): Promise<void>;
  }

  export const OpenWithApp: App;

  export class ProcessInfoRuntime extends AppProcess {
      parent?: IProcess;
      proc?: IProcess;
      procConstructor?: Constructs<IProcess>;
      constructor(pid: number, parentPid: number, app: AppProcessData, proc: IProcess);
      kill(proc: IProcess): Promise<void>;
      killError(name: string, result: ProcessKillResult): void;
  }

  export const ProcessInfoApp: App;

  export class SecureContextRuntime extends AppProcess {
      private id;
      private key;
      data: ElevationData;
      password: ReadableStore<string>;
      loading: ReadableStore<boolean>;
      constructor(pid: number, parentPid: number, app: AppProcessData, id: string, key: string, data: ElevationData);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      validate(): Promise<boolean | undefined>;
      approve(): Promise<void>;
      deny(): Promise<void>;
      passwordIncorrect(): Promise<void>;
      settings(): Promise<void>;
  }

  export const SecureContextApp: App;

  export const ElevationLevelIcons: Record<ElevationLevel, string>;

  export class ServiceInfoRuntime extends AppProcess {
      serviceId: string;
      service: ReadableStore<Service | undefined>;
      serviceProcess: ReadableStore<IBaseService | undefined>;
      serviceSubscriber?: Unsubscriber;
      constructor(pid: number, parentPid: number, app: AppProcessData, serviceId: string);
      start(): Promise<false | undefined>;
      stop(): Promise<void>;
      toggleRunningState(): Promise<void>;
  }

  export const ServiceInfoApp: App;

  export class ShareConnGuiRuntime extends AppProcess {
      shareUsername: ReadableStore<string>;
      shareName: ReadableStore<string>;
      sharePassword: ReadableStore<string>;
      shares: ShareManager;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      go(): Promise<void>;
      myShares(): Promise<void>;
  }

  export const ShareConnGuiApp: App;

  export class ShareCreateGuiRuntime extends AppProcess {
      shareName: ReadableStore<string>;
      sharePassword: ReadableStore<string>;
      shares: ShareManager;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      go(): Promise<void>;
      myShares(): Promise<void>;
  }

  export const ShareCreateGuiApp: App;

  export class ShareListGuiRuntime extends AppProcess {
      ownedShares: ReadableStore<SharedDriveType[]>;
      joinedShares: ReadableStore<SharedDriveType[]>;
      selectedShare: ReadableStore<string>;
      selectedIsOwn: ReadableStore<boolean>;
      selectedIsMounted: ReadableStore<boolean>;
      loading: ReadableStore<boolean>;
      shares: ShareManager;
      thisUserId: string;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      manageShare(): Promise<void>;
      leaveShare(): Promise<void>;
      mountShare(): Promise<void>;
      openShare(): Promise<void>;
      createShare(): Promise<void>;
  }

  export const ShareListGuiApp: App;

  export class OverlayRuntime extends AppProcess {
      parentProcess: ShareMgmtGuiRuntime;
      constructor(pid: number, parentPid: number, app: AppProcessData);
  }

  export const ChangePasswordApp: App;

  export const RenameShareApp: App;

  export class ShareMgmtGuiRuntime extends AppProcess {
      members: ReadableStore<Record<string, string>>;
      info: SharedDriveType | undefined;
      shares: ShareManager;
      shareId: string;
      selectedMember: ReadableStore<string>;
      myShare: boolean;
      protected overlayStore: Record<string, App>;
      constructor(pid: number, parentPid: number, app: AppProcessData, shareId: string);
      start(): Promise<any>;
      updateMembers(): Promise<void>;
      kickUser(id: string, username: string): Promise<void>;
      deleteShare(): Promise<void>;
  }

  export const ShareMgmtGuiApp: App;

  export function ShellContextMenu(runtime: IShellRuntime): AppContextMenu;

  export class ShellRuntime extends AppProcess implements IShellRuntime {
      startMenuOpened: ReadableStore<boolean>;
      actionCenterOpened: ReadableStore<boolean>;
      workspaceManagerOpened: ReadableStore<boolean>;
      calendarOpened: ReadableStore<boolean>;
      stackBusy: ReadableStore<boolean>;
      searchQuery: ReadableStore<string>;
      searchResults: ReadableStore<FuseResult<SearchItem>[]>;
      searching: ReadableStore<boolean>;
      SelectionIndex: ReadableStore<number>;
      FullscreenCount: ReadableStore<Record<string, Set<number>>>;
      openedTrayPopup: ReadableStore<string>;
      searchLoading: ReadableStore<boolean>;
      trayHost?: ITrayHostRuntime;
      arcFind?: IArcFindRuntime;
      ready: ReadableStore<boolean>;
      STARTMENU_FOLDER: string;
      StartMenuContents: ReadableStore<RecursiveDirectoryReadReturn>;
      selectedAppGroup: ReadableStore<string>;
      contextMenu: AppContextMenu;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      stop(): Promise<boolean>;
      gotReadySignal(): Promise<void>;
      pinApp(appId: string): Promise<void>;
      unpinApp(appId: string): void;
      deleteWorkspace(workspace: Workspace): Promise<void>;
      MutateIndex(e: KeyboardEvent): void | -1;
      Trigger(result: SearchItem): Promise<void>;
      Submit(): void;
      refreshStartMenu(): Promise<void>;
      getCalendarMonth(date?: string): CalendarMonth;
      getWeather(): Promise<WeatherInformation>;
      exit(): Promise<void>;
      changeShell(id: string): Promise<false | undefined>;
  }

  export const ArcShellApp: App;

  export class ShellHostRuntime extends Process {
      private autoloadApps;
      readonly shellComponents: string[];
      userPreferences: UserPreferencesStore;
      constructor(pid: number, parentPid: number, _: AppProcessData, autoloadApps: string[]);
      start(): Promise<false | undefined>;
  }

  export const ShellHostApp: App;

  export class ShortcutPropertiesRuntime extends AppProcess {
      shortcutData: ReadableStore<ArcShortcut>;
      iconStore: Record<string, string>;
      path?: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, path: string, data: ArcShortcut);
      start(): Promise<false | undefined>;
      save(): Promise<void>;
      goTarget(): Promise<void>;
      changeIcon(): Promise<void>;
      pickTarget(): Promise<void>;
  }

  export const ShortcutPropertiesApp: App;

  export class SystemShortcutsRuntime extends AppProcess {
      constructor(pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<false | undefined>;
      closeFocused(): Promise<void>;
  }

  export const SystemShortcuts: App;

  export class TotpAuthGuiRuntime extends AppProcess {
      private dispatchId;
      constructor(pid: number, parentPid: number, app: AppProcessData, dispatchId: string);
      render(args: RenderArgs): false | undefined;
      validate(code: string): boolean;
      verifyTotp(code: string): Promise<boolean>;
      cantAccess(): void;
      doDispatch(): Promise<void>;
      cancel(): Promise<void>;
  }

  export const TotpAuthGuiApp: App;

  export class TotpSetupGuiRuntime extends AppProcess {
      code: ReadableStore<string>;
      url: ReadableStore<string>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      validate(): boolean;
      activateTotp(): Promise<boolean>;
  }

  export const TotpSetupGuiApp: App;

  export class TrayHostRuntime extends Process implements ITrayHostRuntime {
      userPreferences?: UserPreferencesStore;
      trayIcons: ReadableStore<Record<`${number}#${string}`, ITrayIconProcess>>;
      constructor(pid: number, parentPid: number, _: AppProcessData);
      start(): Promise<false | undefined>;
      createTrayIcon(pid: number, identifier: string, options: TrayIconOptions, process?: typeof TrayIconProcess): Promise<boolean>;
      disposeTrayIcon(pid: number, identifier: string): Promise<false | undefined>;
      disposeProcessTrayIcons(pid: number): void;
  }

  export const TrayHost: App;

  export class UpdateNotifierRuntime extends AppProcess {
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<false | undefined>;
      onClose(): Promise<boolean>;
  }

  export const UpdateNotifierApp: App;

  export interface DesktopIconPos {
      x: number;
      y: number;
  }

  export type DesktopIcons = Record<string, DesktopIconPos>;

  export class WallpaperRuntime extends AppProcess {
      CONFIG_PATH: string;
      contents: ReadableStore<DirectoryReadReturn | undefined>;
      selected: ReadableStore<string>;
      shortcuts: ReadableStore<ShortcutStore>;
      iconsElement: ReadableStore<HTMLDivElement>;
      orphaned: ReadableStore<string[]>;
      loading: ReadableStore<boolean>;
      directory: string;
      Configuration: ReadableStore<DesktopIcons>;
      contextMenu: AppContextMenu;
      constructor(pid: number, parentPid: number, app: AppProcessData, desktopDir?: string);
      start(): Promise<void>;
      render(): Promise<false | undefined>;
      updateContents(): Promise<void>;
      findAndDeleteOrphans(contents: DirectoryReadReturn | undefined): void;
      findFreeDesktopIconPosition(identifier: string, wrapper?: HTMLDivElement): Promise<unknown> | {
          x: number;
          y: number;
      };
      deleteItem(path: string): Promise<void>;
      uploadItems(): Promise<void>;
      loadConfiguration(): Promise<DesktopIcons | undefined>;
      writeConfiguration(data: DesktopIcons): Promise<DesktopIcons>;
      migrateDesktopIcons(): Promise<boolean>;
  }

  export function WallpaperContextMenu(runtime: WallpaperRuntime): AppContextMenu;

  export const WallpaperApp: App;

  export class BootScreenRuntime extends AppProcess {
      progress: ReadableStore<boolean>;
      status: ReadableStore<string>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      begin(): Promise<void>;
      startBooting(e?: KeyboardEvent): Promise<void>;
  }

  export const BootScreen: App;

  export interface PageButton {
      to?: number;
      action?: () => Promise<void>;
      caption: string;
      suggested?: boolean;
      disabled?: () => boolean | Promise<boolean>;
  }

  export interface PageButtonPage {
      left?: PageButton;
      previous: PageButton;
      next: PageButton;
  }

  export type PageButtons = PageButtonPage[];

  export class InitialSetupRuntime extends AppProcess {
      #private;
      pageNumber: ReadableStore<number>;
      identityInfoValid: ReadableStore<boolean>;
      newUsername: ReadableStore<string>;
      password: ReadableStore<string>;
      confirm: ReadableStore<string>;
      email: ReadableStore<string>;
      actionsDisabled: ReadableStore<boolean>;
      showMainContent: ReadableStore<boolean>;
      displayName: ReadableStore<string>;
      server: IServerManager;
      readonly pages: LegacyComponentType[];
      readonly pageButtons: PageButtons;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      finish(): Promise<void>;
      licenseConfirmation(): Promise<void>;
      viewLicense(): Promise<void>;
      createAccount(): Promise<void>;
      checkAccountActivation(): Promise<void>;
  }

  export const InitialSetupWizard: App;

  export const ProfilePictures: {
      [key: string]: string;
  };

  export interface LoginAppProps {
      userDaemon?: IUserDaemon;
      type?: string;
      safeMode?: boolean;
  }

  export interface PersistenceInfo {
      username: string;
      profilePicture: string;
      loginWallpaper?: string;
  }

  export class LoginAppRuntime extends AppProcess {
      DEFAULT_WALLPAPER: ReadableStore<string>;
      loadingStatus: ReadableStore<string>;
      errorMessage: ReadableStore<string>;
      profileImage: ReadableStore<string>;
      profileName: ReadableStore<string>;
      loginBackground: ReadableStore<string>;
      hideProfileImage: ReadableStore<boolean>;
      persistence: ReadableStore<PersistenceInfo | undefined>;
      serverInfo: ReadableStore<ServerInfo>;
      server: IServerManager;
      safeMode: boolean;
      loginProps?: LoginAppProps;
      private type;
      constructor(pid: number, parentPid: number, app: AppProcessData, props?: LoginAppProps);
      start(): Promise<void>;
      stop(): Promise<void>;
      render(): Promise<false | undefined>;
      getWelcomeString(): string;
      setUserDisplayStuff(userDaemon: IUserDaemon, applyBackground?: boolean): Promise<void>;
      startDaemon(token: string, username: string, info?: UserInfo): Promise<void>;
      logoff(userDaemon: IUserDaemon): Promise<void>;
      shutdown(userDaemon?: IUserDaemon): Promise<void>;
      restart(userDaemon?: IUserDaemon): Promise<void>;
      proceed(username: string, password: string): Promise<void>;
      private saveToken;
      private loadToken;
      private validateUserToken;
      resetCookies(): void;
      private askForTotp;
      firstRun(daemon: IUserDaemon): Promise<void>;
      createUser(): void;
      loadPersistence(): Promise<void>;
      savePersistence(username: string, profilePicture: string, loginWallpaper?: string): void;
      deletePersistence(): Promise<void>;
      updateServerStuff(): void;
  }

  export const LoginApp: App;

  export class SwitchServerRuntime extends AppProcess {
      servers: ReadableStore<ServerOption[]>;
      selected: ReadableStore<string>;
      loading: ReadableStore<boolean>;
      connectionError: ReadableStore<boolean>;
      subscriber?: number;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      stop(): Promise<void>;
      switchServer(server: ServerOption): Promise<void>;
      removeServer(server: ServerOption): Promise<void>;
      addServer(): Promise<void>;
  }

  export const SwitchServerApp: App;

  export class AdvSysSetRuntime extends AppProcess {
      currentTab: ReadableStore<string>;
      tabs: Record<string, Component>;
      preferencesBuffer: ReadableStore<UserPreferences>;
      syncInitialized: boolean;
      bufferInitialized: boolean;
      bufferChanged: ReadableStore<boolean>;
      displayingDesync: boolean;
      preferencesSub?: Unsubscriber;
      bufferSub?: Unsubscriber;
      constructor(pid: number, parentPid: number, app: AppProcessData, tab?: string);
      render(): Promise<false | undefined>;
      apply(close?: boolean): void;
  }

  export const AdvSystemSettings: App;

  export interface StorePage {
      name: string;
      icon: string;
      content: Component<any>;
      hidden?: boolean;
      separator?: boolean;
      props?: (process: AppStoreRuntime, props: Record<string, any>) => Promise<Record<string, any>>;
      groupName?: string;
  }

  export type StorePages = Map<string, StorePage>;

  export const appStorePages: StorePages;

  export class AppStoreRuntime extends AppProcess {
      searchQuery: ReadableStore<string>;
      loadingPage: ReadableStore<boolean>;
      pageProps: ReadableStore<Record<string, any>>;
      searching: ReadableStore<boolean>;
      currentPage: ReadableStore<string>;
      operations: Record<string, IInstallerProcessBase>;
      distrib: DistributionServiceProcess;
      constructor(pid: number, parentPid: number, app: AppProcessData, page?: number, props?: Record<string, any>);
      start(): Promise<false | undefined>;
      render({ page, props }: {
          page?: string;
          props?: Record<string, any>;
      }): Promise<false | undefined>;
      switchPage(id: string, props?: Record<string, any>, force?: boolean): Promise<void>;
      Search(): Promise<void>;
      installPackage(pkg: StoreItem, onDownloadProgress?: FilesystemProgressCallback): Promise<false | 0 | IInstallerProcessBase | "elevateCancel">;
      updatePackage(pkg: StoreItem, onDownloadProgress?: FilesystemProgressCallback): Promise<false | 0 | IInstallerProcessBase>;
      deprecatePackage(pkg: StoreItem): Promise<false | undefined>;
      deletePackage(pkg: StoreItem): Promise<false | undefined>;
      publishPackage(): Promise<boolean | undefined>;
      updateStoreItem(pkg: StoreItem): Promise<void>;
      readmeFallback(pkg: StoreItem): string;
      learnMoreBlocking(): void;
      registerOperation(id: string, proc: IInstallerProcessBase): boolean;
      discardOperation(id: string): boolean;
      getRunningOperation(pkg: StoreItem): IInstallerProcessBase;
      viewImage(url: string, name?: string): Promise<void>;
  }

  export const AppStoreApp: App;

  export class ArcTermRuntime extends Process {
      readonly CONFIG_PATH: string;
      config?: ArcTermConfiguration;
      term: IArcTerminal | undefined;
      path: string | undefined;
      app: AppProcessData;
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string);
      protected start(): Promise<any>;
      readConfig(): Promise<void>;
  }

  export const ArcTermApp: App;

  export interface BugHuntCreatorOptions {
      sendAnonymously: boolean;
      excludeLogs: boolean;
      makePublic: boolean;
  }

  export class BugHuntCreatorRuntime extends AppProcess {
      parent: BugHuntProc | undefined;
      title: ReadableStore<string>;
      body: ReadableStore<string>;
      loading: ReadableStore<boolean>;
      overrideOptions: BugHuntCreatorOptions | undefined;
      bughunt: BugHuntUserSpaceProcess;
      constructor(pid: number, parentPid: number, app: AppProcessData, title?: string, body?: string, options?: BugHuntCreatorOptions);
      Send(): Promise<void>;
      dataPrivacy(): Promise<void>;
  }

  export const BugReportsCreatorApp: App;

  export const BugHuntAltMenu: (p: BugHuntRuntime) => ContextMenuItem[];

  export class BugHuntUserDataRuntime extends AppProcess {
      data: UserInfo;
      hljs: HLJSApi;
      html: string;
      constructor(pid: number, parentPid: number, app: AppProcessData, data: UserInfo);
  }

  export const BugHuntUserDataApp: App;

  export class BugHuntRuntime extends AppProcess {
      loading: ReadableStore<boolean>;
      currentTab: ReadableStore<string>;
      store: ReadableStore<BugReport[]>;
      selectedReport: ReadableStore<string>;
      bughunt: BugHuntUserSpaceProcess;
      protected overlayStore: Record<string, App>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      changeTab(tab: string): Promise<void>;
      refresh(tab?: string): Promise<void>;
      invalidateCaches(restoreSelected?: boolean): Promise<void>;
      newReport(): void;
      viewLogs(): void;
      userData(): void;
      exportReport(): Promise<void>;
  }

  export const BugHuntApp: App;

  export type CalculatorKey = [
      string | null,
      string | null
  ];

  export type CalculatorKeys = [
      string | null,
      string | null
  ][];

  export type CalculatorOverrides = {
      [key: string]: string;
  };

  export class CalculatorStore {
      AllowedKeys: string[];
      Shortcuts: string[];
      Overrides: CalculatorOverrides;
      altClasses: string[];
  }

  export class CalculatorRuntime extends AppProcess {
      Value: ReadableStore<string>;
      Store: CalculatorStore;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      render(args: RenderArgs): Promise<void>;
      keys: CalculatorKeys;
      Functions: {
          [key: string]: [
              string,
              () => void,
              string
          ];
      };
      private eval;
      private compileKeys;
      evaluate(): string | false;
      private isValid;
      generateKeyboardShortcuts(): AppKeyCombination[];
      processKey(key: string): false | undefined;
      validate(expr: string): boolean;
  }

  export const CalculatorApp: App;

  export function FileMenu(runtime: CodRuntime): ContextMenuItem;

  export function LanguageMenu(runtime: CodRuntime): ContextMenuItem;

  export function CodAltMenu(runtime: CodRuntime): ContextMenuItem[];

  export type CodLang = "css" | "ini" | "javascript" | "typescript" | "json" | "markdown" | "xml" | "yaml" | "plaintext" | "sql";

  export const CodTranslations: Record<string, CodLang>;

  export class CodRuntime extends AppProcess {
      language: ReadableStore<CodLang>;
      buffer: ReadableStore<string>;
      openedFile: ReadableStore<string>;
      filename: ReadableStore<string>;
      mimetype: ReadableStore<string>;
      directoryName: ReadableStore<string>;
      original: ReadableStore<string>;
      drive: ReadableStore<IFilesystemDrive | undefined>;
      mimeIcon: ReadableStore<string>;
      acceleratorStore: AppKeyCombinations;
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string);
      render({ path }: {
          path: string;
      }): Promise<void>;
      onClose(): Promise<boolean>;
      readFile(path: string): Promise<void>;
      saveChanges(force?: boolean): Promise<void>;
      saveAs(): Promise<void>;
      openFile(): Promise<void>;
  }

  export function CodAccelerators(runtime: CodRuntime): AppKeyCombinations;

  export const CodApp: App;

  export function DonutAltMenu(runtime: DonutAppRuntime): ContextMenuItem[];

  export class DonutAppRuntime extends AppProcess {
      interval: NodeJS.Timeout;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      stop(): Promise<void>;
      readonly FPS = 30;
      Buffer: ReadableStore<string>;
      A: number;
      B: number;
      Tick(): Promise<void>;
  }

  export const DonutApp: App;

  export class FeedbackProcess extends Process {
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
  }

  export const feedbackApp: App;

  export const FileManagerApp: App;

  export const DriveIcons: Record<string, string>;

  export const DriveIconsMulticolor: Record<string, string>;

  export class IconEditorRuntime extends AppProcess {
      iconGroups: ReadableStore<Record<string, string[]>>;
      icons: ReadableStore<Record<string, string>>;
      filtered: ReadableStore<Record<string, string>>;
      iconService?: IconService;
      selectedIcon: ReadableStore<string>;
      selectedGroup: ReadableStore<string>;
      hasChanges: ReadableStore<boolean>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      onClose(): Promise<boolean>;
      revert(): void;
      setGroups(): void;
      updateFiltered(v?: string): void;
      save(): Promise<void>;
      editIcon(): Promise<void>;
  }

  export const IconEditorApp: App;

  export const IconIdTypeCaptions: Record<string, string>;

  export const IconGroupIcons: Record<string, string>;

  export class ImageViewerRuntime extends AppProcess {
      openedFile: ReadableStore<string>;
      imageUrl: ReadableStore<string>;
      indirect: ReadableStore<boolean>;
      overridePopulatable: boolean;
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string);
      render({ path }: {
          path: string;
      }): Promise<boolean | void>;
      readFile(path: string): Promise<void>;
      readFileIndirectFallback(path: string): Promise<void>;
  }

  export const ImageViewerApp: App;

  export type LightsOffGrid = boolean[][];

  export class LightsOffLevels {
      runtime: LightsOffRuntime;
      constructor(runtime: LightsOffRuntime);
      private _store;
      loadLevel(level: number): void;
      checkNextLevel(): Promise<boolean | void>;
  }

  export class LightsOffRuntime extends AppProcess {
      xModifiers: number[];
      yModifiers: number[];
      Grid: ReadableStore<LightsOffGrid>;
      Transitioning: ReadableStore<boolean>;
      Clicks: ReadableStore<number>;
      LEVEL: ReadableStore<number>;
      Levels: LightsOffLevels;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      containsLights(): boolean;
      finish(): void;
      ToggleLight(x: number, y: number): void;
      loadData(): void;
      saveData(): void;
  }

  export const LightsOffApp: App;

  export type CollectorResult = {
      [key: string]: LogItem[];
  };

  export type IterableCollectorResult = [
      string,
      LogItem[]
  ][];

  export type FilterLevel = LogLevel | "all";

  export type GroupedBySource = Map<string, LogItem[]>;

  export type CurrentSource = ReadableStore<string>;

  export type LogSource = {
      what: string;
      timestamp: number;
  };

  export class LoggingRuntime extends AppProcess {
      groups: ReadableStore<Map<string, LogItem[]>>;
      sources: ReadableStore<LogSource[]>;
      currentSource: ReadableStore<string>;
      selectedLevel: ReadableStore<FilterLevel>;
      private archive;
      isArchive: boolean;
      constructor(pid: number, parentPid: number, app: AppProcessData, source?: string, level?: FilterLevel, archive?: LogItem[]);
      updateGroups(): void;
      collectLogsBySource(logs: LogItem[], reverse?: boolean): {
          items: CollectorResult;
          sources: LogSource[];
      };
  }

  export const LoggingApp: App;

  export const FilterLevels: FilterLevel[];

  export const FilterIcons: Map<"all" | LogLevel, string>;

  export const LogItemIcons: Record<LogLevel, string>;

  export const MediaPlayerAccelerators: (runtime: MediaPlayerRuntime) => AppKeyCombinations;

  export function FileMenu(runtime: MediaPlayerRuntime): ContextMenuItem;

  export function PlaylistAltMenu(runtime: MediaPlayerRuntime): ContextMenuItem;

  export function MediaPlayerAltMenu(runtime: MediaPlayerRuntime): ContextMenuItem[];

  export enum LoopMode {
      None = 0,
      All = 1,
      One = 2
  }

  export interface PlayerState {
      paused: boolean;
      current: number;
      duration: number;
  }

  export interface AudioFileMetadata {
      coverImagePath?: string;
      artist?: string;
      title?: string;
      album?: string;
      year?: number;
      genre?: string;
  }

  export type MetadataConfiguration = Record<string, AudioFileMetadata>;

  export class MediaPlayerRuntime extends AppProcess {
      private readonly METADATA_PATH;
      private readonly COVERIMAGES_PATH;
      queue: ReadableStore<string[]>;
      queueIndex: ReadableStore<number>;
      url: ReadableStore<string>;
      player: HTMLVideoElement | undefined;
      seeking: ReadableStore<boolean>;
      loopMode: ReadableStore<LoopMode>;
      State: ReadableStore<PlayerState>;
      isVideo: ReadableStore<boolean>;
      Loaded: ReadableStore<boolean>;
      playlistPath: ReadableStore<string>;
      MetadataConfiguration: ReadableStore<MetadataConfiguration>;
      CurrentMediaMetadata: ReadableStore<AudioFileMetadata | undefined>;
      CurrentCoverUrl: ReadableStore<string | undefined>;
      LoadingMetadata: ReadableStore<boolean>;
      mediaSpecificAccentColor: ReadableStore<string>;
      contextMenu: AppContextMenu;
      constructor(pid: number, parentPid: number, app: AppProcessData, file?: string);
      onClose(): Promise<boolean>;
      protected start(): Promise<any>;
      protected stop(): Promise<any>;
      render({ file }: RenderArgs): Promise<void>;
      setPlayer(player: HTMLVideoElement): void;
      Reset(): void;
      Play(): Promise<void>;
      Pause(): Promise<void>;
      Seek(mod: number): void;
      SeekTo(secondTime: number): void;
      Stop(): void;
      SetLoopNone(): Promise<void>;
      SetLoopAll(): Promise<void>;
      SetLoopOne(): Promise<void>;
      updateState(): void | {
          paused: boolean;
          current: number;
          duration: number;
      };
      openFile(): Promise<void>;
      readFile(paths: string[], addToQueue?: boolean): Promise<void>;
      nextSong(): void;
      previousSong(): Promise<void>;
      clearQueue(): void;
      handleSongChange(v: number): Promise<void>;
      addToQueue(): Promise<void>;
      moveQueueItem(sourceIndex: number, targetIndex: number): void;
      savePlaylist(queue?: string[]): Promise<void>;
      readPlaylist(path: string): Promise<void>;
      createPlaylistShortcut(): Promise<void>;
      folderAsPlaylist(): Promise<void>;
      failedToPlay(e?: any): Promise<void>;
      readConfiguration(): Promise<void>;
      writeConfiguration(configuration: MetadataConfiguration): Promise<void>;
      normalizeMetadata(meta: IAudioMetadata): Promise<AudioFileMetadata>;
      parseMetadata(path: string, apply?: boolean): Promise<CommandResult<AudioFileMetadata>>;
      parseEntireQueue(): Promise<void>;
      formatTime(seconds: number): string;
      openFileLocation(): void;
  }

  export const MediaPlayerApp: App;

  export interface MessagingPage {
      name: string;
      icon: string;
      supplier: (process: MessagingAppRuntime) => Promise<ExpandedMessage[]> | ExpandedMessage[];
  }

  export const messagingPages: Record<string, MessagingPage>;

  export class MessagingAppRuntime extends AppProcess {
      service: MessagingInterface;
      page: ReadableStore<MessagingPage | undefined>;
      pageId: ReadableStore<string | undefined>;
      buffer: ReadableStore<ExpandedMessage[]>;
      correlated: ReadableStore<ExpandedMessage[][]>;
      loading: ReadableStore<boolean>;
      refreshing: ReadableStore<boolean>;
      errored: ReadableStore<boolean>;
      messageNotFound: ReadableStore<boolean>;
      message: ReadableStore<ExpandedMessage | undefined>;
      userInfoCache: Record<string, PublicUserInfo>;
      searchQuery: ReadableStore<string>;
      searchResults: ReadableStore<string[]>;
      messageWindow: boolean;
      messageFromFile: boolean;
      constructor(pid: number, parentPid: number, app: AppProcessData, pageOrMessagePath?: string, messageId?: string);
      start(): Promise<false | undefined>;
      render({ page }: {
          page: string;
      }): Promise<void>;
      getInbox(): Promise<ExpandedMessage[]>;
      getSent(): Promise<ExpandedMessage[]>;
      getArchived(): Promise<ExpandedMessage[]>;
      readMessage(messageId: string, force?: boolean): Promise<void>;
      userInfo(userId: string): Promise<CommandResult<PublicUserInfo>>;
      readMessageFromFile(path: string): Promise<boolean | void>;
      deleteMessage(id: string): Promise<void>;
      compose(): void;
      replyTo(message: ExpandedMessage): void;
      forward(message: ExpandedMessage): Promise<void>;
      saveMessage(): Promise<void>;
      getArchiveState(): string[];
      setArchiveState(state: string[]): void;
      isArchived(id: string): boolean;
      addToArchive(id: string): void;
      removeFromArchive(id: string): void;
      toggleArchived(message: ExpandedMessage): void;
      switchPage(id: string): Promise<void>;
      refresh(): Promise<void>;
      correlateMessages(messages: ExpandedMessage[]): ExpandedMessage[][];
      refreshFailed(): void;
      Search(query: string): void;
      popoutMessage(messageId: string): void;
      readAttachment(attachment: MessageAttachment, messageId: string, prog: FileProgressMutator): Promise<ArrayBuffer | undefined>;
      openAttachment(attachment: MessageAttachment, messageId: string): Promise<void>;
  }

  export const MessagingApp: App;

  export class PdfViewerRuntime extends AppProcess {
      openedFile: ReadableStore<string>;
      documentUrl: ReadableStore<string>;
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string);
      render({ path }: {
          path: string;
      }): Promise<boolean | void>;
      readFile(path: string): Promise<void>;
      readFileIndirectFallback(path: string): Promise<void>;
  }

  export const PdfViewerApp: App;

  export class ProcessManagerRuntime extends AppProcess {
      selected: ReadableStore<string>;
      running: ReadableStore<number>;
      currentTab: ReadableStore<string>;
      tabs: Record<string, Component>;
      host: IServiceHost;
      constructor(pid: number, parentPid: number, app: AppProcessData, page?: string);
      render(): Promise<false | undefined>;
      kill(proc: IProcess): Promise<void>;
      killError(name: string, result: ProcessKillResult): void;
      stopService(id: string): Promise<void>;
      restartService(id: string): Promise<void>;
      startService(id: string): Promise<void>;
      serviceInfoFor(id: string): void;
      appInfoFor(proc: IAppProcess): void;
      processInfoFor(proc: IProcess): void;
  }

  export const ProcessesApp: App;

  export interface Box {
      modifier: number;
      class: string;
      yoffset: number;
  }

  export class QlorbRuntime extends AppProcess {
      readonly random: (m: number) => number;
      readonly Boxes: ReadableStore<Box[]>;
      readonly BoxesOffset: ReadableStore<number>;
      readonly Clicks: ReadableStore<number>;
      readonly Score: ReadableStore<number>;
      readonly OldClicks: ReadableStore<number>;
      readonly BOX_SIZE = 30;
      readonly BOX_VALUES: number[];
      readonly PAGES: string[];
      readonly CurrentPage: ReadableStore<string>;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      spawnBox(props?: Box | null, useOffset?: boolean, forcePositive?: boolean): Box;
      private createRandomBox;
      private findBoxClass;
      ScorePoints(box: Box, button?: HTMLButtonElement): void;
      ScoreNegativePoints(box: Box, button?: HTMLButtonElement): void;
      private levelDown;
      clickReset(): void;
      flushStores(): void;
      onSwitchPage(): void;
      switchPage(page: string): boolean;
  }

  export const QlorbApp: App;

  export class OverlayRuntime extends AppProcess {
      parentProcess: SettingsRuntime;
      constructor(pid: number, parentPid: number, app: AppProcessData);
  }

  export const ChangePasswordApp: App;

  export const ChangeUsernameApp: App;

  export const SaveThemeApp: App;

  export const UrlLoginBackground: App;

  export const UrlProfilePicture: App;

  export const UrlWallpaper: App;

  export const UserFontApp: App;

  export interface SettingsPage {
      name: string;
      icon: string;
      content: Component<any>;
      hidden?: boolean;
      separator?: boolean;
      description: string;
      noSafeMode?: boolean;
  }

  export type SettingsPages = Map<string, SettingsPage>;

  export type SettingsSlides = Map<string, Component<any>>;

  export const settingsPageStore: SettingsPages;

  export const SlideStore: SettingsSlides;

  export class SettingsRuntime extends AppProcess {
      currentPage: ReadableStore<string>;
      currentSlide: ReadableStore<string>;
      slideVisible: ReadableStore<boolean>;
      requestedSlide: string | undefined;
      protected overlayStore: Record<string, App>;
      protected elevations: Record<string, ElevationData>;
      contextMenu: AppContextMenu;
      constructor(pid: number, parentPid: number, app: AppProcessData, page?: string, slide?: string);
      render(): Promise<false | undefined>;
      switchPage(pageId: string): void;
      showSlide(id: string): Promise<void>;
      loginActivity(): Promise<void>;
      logOutEverywhere(): Promise<void>;
      uploadWallpaper(): Promise<void>;
      viewLicense(): Promise<void>;
      deleteThemeConfirmation(id?: string): void;
      chooseProfilePicture(): Promise<void>;
      chooseWallpaper(): Promise<void>;
      chooseLoginBackground(): Promise<void>;
      setup2fa(): Promise<void>;
      disableTotp(): Promise<void>;
  }

  export function SettingsContext(runtime: SettingsRuntime): AppContextMenu;

  export const SystemSettings: App;

  export function sqljsResultToJSON(result: QueryExecResult[]): Record<string, any>[][];

  export class SqlInterfaceProcess extends Process {
      private filePath;
      private sql?;
      db?: initSqlJs.Database;
      isFresh: boolean;
      constructor(pid: number, parentPid: number, path: string);
      start(): Promise<void>;
      reset(): void;
      initialize(): Promise<void>;
      readFile(): Promise<void>;
      writeFile(): Promise<void>;
      stop(): Promise<void>;
      exec(sql: string, params?: initSqlJs.BindParams | undefined): Record<string, any>[][] | string;
  }

  export interface SqlTable {
      uuid: string;
      name: string;
      rootpage: number;
      sql: string;
      tbl_name: string;
      type: string;
      columns: SqlTableColumn[];
  }

  export interface SqlTableColumn {
      cid: number;
      name: string;
      type: string;
      notnull: IntBool;
      dflt_value: any;
      pk: IntBool;
      uuid: string;
  }

  export interface SqeletonTab {
      name: string;
      count?: ReadableStore<any[]>;
      className?: string;
  }

  export type SqeletonTabs = Record<string, SqeletonTab>;

  export interface SqeletonError {
      uuid: string;
      sql: string;
      timestamp: number;
      text: string;
      system: boolean;
  }

  export interface SqeletonHistoryItem {
      uuid: string;
      sql: string;
      timestamp: number;
      result: Record<string, any>[][];
      system: boolean;
  }

  export class SqeletonRuntime extends AppProcess {
      openedFile: ReadableStore<string>;
      openedFileName: ReadableStore<string>;
      _intf: ReadableStore<SqlInterfaceProcess | undefined>;
      queries: ReadableStore<string[]>;
      queryIndex: ReadableStore<number>;
      errors: ReadableStore<SqeletonError[]>;
      queryHistory: ReadableStore<SqeletonHistoryItem[]>;
      working: ReadableStore<boolean>;
      errored: ReadableStore<boolean>;
      result: ReadableStore<Record<string, any>[][] | undefined>;
      tables: ReadableStore<SqlTable[]>;
      busy: boolean;
      currentTab: ReadableStore<string>;
      syntaxError: ReadableStore<boolean>;
      tempDbPath: string;
      tempDb?: SqlInterfaceProcess;
      tabs: SqeletonTabs;
      get Interface(): SqlInterfaceProcess | undefined;
      set Interface(value: SqlInterfaceProcess | undefined);
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string);
      start(): Promise<void>;
      stop(): Promise<void>;
      render({ path }: {
          path?: string;
      }): Promise<void>;
      readFile(path: string): Promise<void>;
      openFile(): Promise<void>;
      newFile(): Promise<void>;
      execute(code: string, simple?: boolean, system?: boolean): Promise<string | Record<string, any>[][] | undefined>;
      updateTables(): Promise<void>;
      newQuery(value?: string): void;
      openOrCreateQuery(value: string): void;
      deleteQuery(index?: number): void;
      tableToSql(table: SqlTable, pretty?: boolean, dropFirst?: boolean): Promise<CommandResult<string>>;
      hasSyntaxError(input: string): Promise<boolean>;
      waitForAvailable(): Promise<void>;
      dropTableInteractively(table: string): void;
      ExistingConnectionError(): void;
      DbOpenError(e: string): void;
      TablesUpdateError(e: string): void;
  }

  export const SqeletonApp: App;

  export function EditMenu(runtime: WriterRuntime): ContextMenuItem;

  export function FileMenu(runtime: WriterRuntime): ContextMenuItem;

  export function ViewMenu(runtime: WriterRuntime): ContextMenuItem;

  export function WriterAltMenu(runtime: WriterRuntime): ContextMenuItem[];

  export class ReplaceRuntime extends AppProcess {
      parent: WriterRuntime;
      constructor(pid: number, parentPid: number, app: AppProcessData);
      replaceOnce(text: string, replacer: string): void;
      replaceAll(text: string, replacer: string): void;
  }

  export const ReplaceOverlay: App;

  export class WriterRuntime extends AppProcess {
      buffer: ReadableStore<string>;
      openedFile: ReadableStore<string>;
      filename: ReadableStore<string>;
      mimetype: ReadableStore<string>;
      directoryName: ReadableStore<string>;
      original: ReadableStore<string>;
      input: ReadableStore<HTMLTextAreaElement>;
      drive: ReadableStore<IFilesystemDrive | undefined>;
      mimeIcon: ReadableStore<string>;
      protected overlayStore: Record<string, App>;
      acceleratorStore: AppKeyCombinations;
      constructor(pid: number, parentPid: number, app: AppProcessData, path?: string);
      render({ path }: {
          path: string;
      }): Promise<void>;
      onClose(): Promise<boolean>;
      readFile(path: string): Promise<void>;
      saveChanges(force?: boolean): Promise<void>;
      saveAs(): Promise<void>;
      openFile(): Promise<void>;
      selectAll(): void;
  }

  export function WriterAccelerators(runtime: WriterRuntime): AppKeyCombinations;

  export const WriterApp: App;

  export const RelativeTimeMod: {
      relativeTime: {
          future: string;
          past: string;
          s: string;
          m: string;
          mm: string;
          h: string;
          hh: string;
          d: string;
          dd: string;
          M: string;
          MM: string;
          y: string;
          yy: string;
      };
  };

  export const MODES: Record<string, string>;

  export const ALIASED_MODES: Record<string, string>;

  export const Logo: () => string;

  export function scopeToScopeCaption(scope: string): string;

  export function stringifyLogs(logs: LogItem[]): string;

  export function getReportIcon(report: BugReport): string;

  export interface InstallerProcProgressNode {
      proc: IInstallerProcessBase | undefined;
      status: ReadableStore<InstallStatus>;
      failReason: ReadableStore<string>;
      installing: ReadableStore<boolean>;
      completed: ReadableStore<boolean>;
      focused: ReadableStore<string>;
      verboseLog: string[];
  }

  export interface WeatherSearchResult {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
      elevation: number;
      feature_code: string;
      country_code: string;
      admin1_id: number;
      admin2_id: number;
      timezone: string;
      postcodes: string[];
      country_id: number;
      country: string;
      admin1: string;
      admin2: string;
  }

  export interface WeatherSearchResponse {
      results: WeatherSearchResult[];
      generationtime_ms: number;
  }

  export const serviceHost: IServiceHost | undefined;

  export const icons: Record<string, string>;

  export const util: {
      htmlspecialchars: typeof htmlspecialchars;
      Plural: typeof Plural;
      sliceIntoChunks: typeof sliceIntoChunks;
      decimalToHex: typeof decimalToHex;
      sha256: typeof sha256;
      CountInstances: typeof CountInstances;
      join: typeof join;
      getItemNameFromPath: typeof getItemNameFromPath;
      getParentDirectory: typeof getParentDirectory;
      getDriveLetter: typeof getDriveLetter;
      formatBytes: typeof formatBytes;
      DownloadFile: typeof DownloadFile;
      onFileChange: typeof onFileChange;
      onFolderChange: typeof onFolderChange;
  };

  export const convert: {
      arrayToText: typeof arrayBufferToText;
      textToArrayBuffer: typeof textToArrayBuffer;
      blobToText: typeof blobToText;
      textToBlob: typeof textToBlob;
      arrayToBlob: typeof arrayBufferToBlob;
      blobToDataURL: typeof blobToDataURL;
  };

  export const workingDirectory: string;

  export const Process: Constructs<IProcess>;

  export const AppProcess: Constructs<IAppProcess>;

  export const ThirdPartyAppProcess: Constructs<IThirdPartyAppProcess>;

  export const FilesystemDrive: Constructs<IFilesystemDrive>;

  export const argv: any[];

  export const app: App;

  export const $ENTRYPOINT: string;

  export const $METADATA: string;

  export const SHELL_PID: number;

  export const OPERATION_ID: string;

  export const load: (path: string) => Promise<any>;

  export const runApp: (process: Constructs<IAppProcess>, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<IThirdPartyAppProcess | undefined>;

  export const runAppDirect: (process: Constructs<IAppProcess>, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<IThirdPartyAppProcess | undefined>;

  export const loadHtml: (path: string) => Promise<string | undefined>;

  export const loadDirect: (path: string) => Promise<string | undefined>;

  export const Server: AxiosInstance;

  export const Debug: (m: any) => void;

  export const dayjs: (s: string) => dayjs.Dayjs;
}

export {};
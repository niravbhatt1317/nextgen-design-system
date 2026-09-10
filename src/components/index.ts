// Every component this library exports.
//
// ORDER IS ALPHABETICAL, AND THAT IS LOAD-BEARING. Add your component in its
// alphabetical place - do not append to the end.
//
// This file is the one file every new component has to touch, so it is the one
// place two people working in parallel are guaranteed to collide. When the list
// was in append-order, both of us added at the last line and conflicted on
// every single pull request. Alphabetical insertion puts two new components
// hundreds of lines apart, and git merges them without a word.

// AiMark
export { AiMark } from './AiMark';
export type { AiMarkProps, AiMarkVariant, AiMarkAppearance, AiMarkSize } from './AiMark';

// Avatar — circle or rounded square, photo or initials. The colour is derived
// from the name, so one person is always one colour.
export { Avatar, AvatarStack, avatarVariants, toneForName, initialsForName } from './Avatar';
export type {
  AvatarProps,
  AvatarOwnProps,
  AvatarStackProps,
  AvatarVariantsType,
  AvatarTone,
  AvatarSize,
  AvatarShape,
} from './Avatar';

// Badge — the badge ported from the merged console: status pills, sources, counts,
// category chips and the unread marker; never removable (that is TagPill). No stroke;
// small is text or dot only. Replaced the previous Badge (now BadgeOld) 2026-09-04.
export { Badge, badgeVariants } from './Badge';
export type {
  BadgeProps,
  BadgeOwnProps,
  BadgeVariantsType,
  BadgeTone,
  BadgeEmphasis,
  BadgeShape,
  BadgeSize,
  BadgePalette,
} from './Badge';

// BadgeOld — the previous badge. DEPRECATED 2026-09-04: use Badge.
export { BadgeOld, badgeOldVariants } from './BadgeOld';
export type {
  BadgeOldProps,
  BadgeOldOwnProps,
  BadgeOldVariantsType,
  BadgeOldTone,
  BadgeOldEmphasis,
  BadgeOldShape,
  BadgeOldSize,
} from './BadgeOld';

// Banner — a message that sits in the page and stays there. Shares Toast's six
// tones and palette on purpose; shares nothing about how it behaves. If you
// would still need the message after a refresh, it is a Banner.
export { Banner, bannerVariants } from './Banner';
export type {
  BannerProps,
  BannerOwnProps,
  BannerVariantsType,
  BannerTone,
  BannerPlacement,
  BannerActionPlacement,
} from './Banner';

// Button
export { Button, ButtonVariants } from './Button';
export type { ButtonProps, ButtonVariantsType } from './Button';

// PageFrame - the default page layout of the merged console (2026-09-10): a rail
// beside ONE scroll container holding four bands in a fixed order. The sticky
// ladder is derived from the band heights, and the surface takes its inset from
// whichever band is above it.
export { PageFrame, PageHeader, PageHero, PageBand, PageSurface } from './PageFrame';
export type {
  PageFrameProps,
  PageHeaderProps,
  PageHeroProps,
  PageBandProps,
  PageSurfaceProps,
  PageBandVariant,
} from './PageFrame';
// ButtonGroup
export { ButtonGroup, buttonGroupVariants } from './ButtonGroup';
export type { ButtonGroupProps, ButtonGroupVariants } from './ButtonGroup';

// Callout
export { Callout, calloutVariants } from './Callout';
export type { CalloutProps, CalloutTone, CalloutSize, CalloutVariant } from './Callout';

// Card — a surface that holds related content in the page. It does not open,
// close, float or freeze the page behind it; those are Modal and Popover, which
// borrow this surface and add their own behaviour. Clickable and collapsible
// ship as separate components so a control inside a control cannot be written.
export {
  Card,
  CardMedia,
  CardHeader,
  CardBody,
  CardFooter,
  ClickableCard,
  CollapsibleCard,
  cardVariants,
} from './Card';
export type {
  CardProps,
  CardOwnProps,
  CardSurface,
  CardPadding,
  CardMediaProps,
  CardHeaderProps,
  CardHeaderOwnProps,
  CardBodyProps,
  CardFooterProps,
  CardFooterOwnProps,
  ClickableCardProps,
  ClickableCardOwnProps,
  CollapsibleCardProps,
  CollapsibleCardOwnProps,
} from './Card';

// Checkbox
export * from './Checkbox';

// CodeWell — read-only monospace surface. Both Org Mgmt and Agent Fleet asked
// for exactly this in their audits.
export { CodeWell, codeWellVariants } from './CodeWell';
export type { CodeWellProps, CodeWellVariantsType, CodeWellSurface } from './CodeWell';

// Combobox
export { Combobox, comboboxTriggerVariants } from './Combobox';
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxTriggerVariants,
  RenderOptionProps,
  RenderTriggerProps,
} from './Combobox';

// Command
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command';
export type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from './Command';

// Container
export { Container, containerVariants } from './Container';
export type { ContainerProps, ContainerVariants } from './Container';

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogBody,
  DialogMedia,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  useSubmitShortcut,
  useTypedConfirmation,
  DialogSteps,
} from './Dialog';
export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogBodyProps,
  DialogMediaProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from './Dialog';

// DropdownMenu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './DropdownMenu';
export type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuGroupProps,
  DropdownMenuPortalProps,
  DropdownMenuSubProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
} from './DropdownMenu';

// Backward compatibility (deprecated)
/** @deprecated Use DropdownMenu instead. Will be removed in v2.0.0 */
export { DropdownMenu as Dropdown } from './DropdownMenu';

// Flex
export { Flex, flexVariants } from './Flex';
export type { FlexProps, FlexVariants } from './Flex';

// Form
export { Form, FormField, FormLabel, FormControl, FormMessage, FormDescription } from './Form';
export type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormDescriptionProps,
} from './Form';

// Grid
export { Grid, gridVariants } from './Grid';
export type { GridProps, GridVariants } from './Grid';

// HoverCard
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardPortal,
  HoverCardArrow,
} from './HoverCard';
export type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
  HoverCardArrowProps,
} from './HoverCard';

// Icon
export { Icon, iconVariants, iconRegistry, iconNames } from './Icon';
export type { IconProps, IconVariants, IconName, IconSize, IconColor } from './Icon';

// IconTile — tinted container for a single icon. Org Mgmt's most duplicated
// inline pattern.
export { IconTile, iconTileVariants } from './IconTile';
export type {
  IconTileProps,
  IconTileVariantsType,
  IconTileTone,
  IconTileSize,
  IconTileShape,
} from './IconTile';

// Input
export { Input, InputVariants } from './Input';
export type { InputProps, InputVariantsType } from './Input';

// InputGroup
export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea,
} from './InputGroup';
export type {
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupInputProps,
  InputGroupTextProps,
  InputGroupButtonProps,
  InputGroupTextareaProps,
} from './InputGroup';

// Item
export { Item, itemVariants } from './Item';
export type { ItemProps, ItemVariants } from './Item';

// Kbd
export { Kbd, KbdVariants, usePlatform } from './Kbd';
export type {
  KbdProps,
  KbdKey,
  KbdNamedKey,
  KbdLayout,
  KbdVariant,
  KbdSize,
  KbdTone,
  KbdPlatform,
} from './Kbd';

// Label — the uppercase micro-heading, settling three competing letter-spacings
export { Label, labelVariants } from './Label';
export type { LabelProps, LabelVariantsType, LabelSize } from './Label';

// OTPInput
export { OTPInput } from './OTPInput';
export type { OTPInputProps } from './OTPInput';

// Pagination
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationLinkVariants,
} from './Pagination';
export type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationEllipsisProps,
} from './Pagination';

// Popover
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose } from './Popover';
export type { PopoverProps, PopoverTriggerProps, PopoverContentProps } from './Popover';

// Progress — value fill with optional baseline and floor markers
export { Progress, progressVariants } from './Progress';
export type {
  ProgressProps,
  ProgressOwnProps,
  ProgressVariantsType,
  ProgressTone,
  ProgressSize,
} from './Progress';

// Radio
export * from './Radio';

// Resizable
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable';
export type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from './Resizable';

// ScrollArea
export { ScrollArea, ScrollAreaViewport, ScrollBar, ScrollAreaCorner } from './ScrollArea';
export type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollBarProps,
  ScrollAreaCornerProps,
  ScrollOrientation,
} from './ScrollArea';

// SecretDots — a masked secret, at a fixed length so it leaks nothing
export { SecretDots, BULLET_COUNT } from './SecretDots';
export type { SecretDotsProps, SecretDotsSize } from './SecretDots';

// Select
export { Select, selectTriggerVariants } from './Select';
export type {
  SelectProps,
  SelectOption,
  SelectOptionGroup,
  SelectMode,
  SelectSize,
} from './Select';

// Separator
export { Separator, separatorVariants } from './Separator';
export type { SeparatorProps, SeparatorVariants } from './Separator';

// Sheet
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
} from './Sheet';
export type {
  SheetProps,
  SheetTriggerProps,
  SheetPortalProps,
  SheetOverlayProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
  SheetSide,
  SheetVariants,
} from './Sheet';

// LeftNavOld — the previous settings-only navigation. DEPRECATED 2026-09-03: use LeftNav.
export {
  LeftNavOld,
  LeftNavExit,
  LeftNavSearch,
  LeftNavBody,
  LeftNavSection,
  LeftNavGroup,
  LeftNavExpandable,
  LeftNavItem,
  LeftNavFooter,
  DataLeftNav,
  leftNavItemVariants,
  useLeftNavLevels,
} from './LeftNavOld';
export type {
  LeftNavOldProps,
  LeftNavExitProps,
  LeftNavSearchProps,
  LeftNavBodyProps,
  LeftNavSectionProps,
  LeftNavGroupProps,
  LeftNavExpandableProps,
  LeftNavItemProps,
  LeftNavFooterProps,
  DataLeftNavProps,
  LeftNavConfig,
  LeftNavConfigItem,
  UseLeftNavLevels,
  UseLeftNavLevelsOptions,
} from './LeftNavOld';

// LeftNav — the product navigation: the workspace rail, then the Settings and
// Agent Fleet floors. Ported from the merged console; replaced LeftNavOld 2026-09-03.
export { LeftNav, LeftNavTrigger } from './LeftNav';
export type {
  LeftNavAccount,
  LeftNavBoard,
  LeftNavCollection,
  LeftNavOrg,
  LeftNavProps,
  LeftNavTheme,
  LeftNavTriggerProps,
  LeftNavSettingsItem,
  LeftNavSettingsSection,
  LeftNavView,
} from './LeftNav';

// Sidebar
export {
  Sidebar,
  SidebarHeader,
  SidebarSearch,
  SidebarContent,
  SidebarSection,
  SidebarLabel,
  SidebarCollapse,
  SidebarItem,
  SidebarFooter,
  sidebarVariants,
} from './Sidebar';
export type {
  SidebarProps,
  SidebarVariants,
  SidebarHeaderProps,
  SidebarSearchProps,
  SidebarContentProps,
  SidebarSectionProps,
  SidebarLabelProps,
  SidebarCollapseProps,
  SidebarItemProps,
  SidebarFooterProps,
} from './Sidebar';

// Skeleton
export { Skeleton, skeletonVariants } from './Skeleton';
export type { SkeletonProps, SkeletonVariants } from './Skeleton';

// Spinner
export { Spinner, spinnerVariants } from './Spinner';
export type { SpinnerProps, SpinnerVariants } from './Spinner';

// Stack
export { Stack, stackVariants } from './Stack';
export type { StackProps, StackVariants } from './Stack';

// Stepper — a named, ordered journey with a place you are now. Not Tabs: if you
// can do them in any order, it is Tabs. Not Progress either, which is one number
// with no names. Horizontal only; vertical is a separate component.
export { Stepper, stepperVariants } from './Stepper';
export type {
  StepperProps,
  StepperOwnProps,
  StepperVariantsType,
  StepperStep,
  StepperLayout,
  StepState,
} from './Stepper';

// Switch
export { MotadataSwitch, motadataSwitchRootVariants, motadataSwitchThumbVariants } from './Switch';
export type { MotadataSwitchProps, MotadataSwitchVariants } from './Switch';

// TableOld — the previous TableOld family: primitives, DataTableOld, menus, pager, bulk bar and hooks.
// DEPRECATED 2026-09-07: use TableOld / DataTableOld, the merged console Users table.
export {
  TableOld,
  TableHeaderOld,
  TableBodyOld,
  TableFooterOld,
  TableRowOld,
  TableGroupRowOld,
  TableExpandTriggerOld,
  TableHeadOld,
  TableCellOld,
  TableCaptionOld,
  tableHeadOldVariants,
  tableCellOldVariants,
  tableRowOldVariants,
  tableGroupRowOldVariants,
  TableToolbarOld,
  TableToolbarActionsOld,
  TableSortMenuOld,
  TableViewMenuOld,
  TableViewSwitcherOld,
  TablePaginationOld,
  TableBulkBarOld,
  TableBulkActionOld,
  TableBulkSeparatorOld,
  DataTableOld,
  TableFilterMenuOld,
  TableFilterChipsOld,
  TableColumnMenuOld,
  TableColumnBoundaryOld,
  useColumnWidthsOld,
  useColumnReorderOld,
  useTableColumnsOld,
  toCsvOld,
  useTableFiltersOld,
  useTablePaginationOld,
  useTableSelectionOld,
  useTableSortOld,
  useSavedViewsOld,
  useInfiniteScrollOld,
} from './TableOld';
export type {
  ColumnWidthsOld,
  UseColumnWidthsOld,
  UseColumnWidthsOldOptions,
  TableOldProps,
  TableHeaderOldProps,
  TableBodyOldProps,
  TableFooterOldProps,
  TableRowOldProps,
  TableHeadOldProps,
  TableCellOldProps,
  TableCaptionOldProps,
  TableGroupRowOldProps,
  TableExpandTriggerOldProps,
  TableDensityOld,
  TableAlignOld,
  TableSortOrderOld,
  TableIndentOld,
  TableToolbarOldProps,
  TableToolbarActionsOldProps,
  TableSortMenuOldProps,
  TableViewMenuOldProps,
  TableViewSwitcherOldProps,
  TablePaginationOldProps,
  TableViewSummaryOld,
  TableBulkBarOldProps,
  TableBulkActionOldProps,
  TableFilterMenuOldProps,
  TableFilterChipsOldProps,
  DataTableOldProps,
  TableColumnMenuOldProps,
  TableColumnBoundaryOldProps,
  TableColumnDefOld,
  TableColumnViewOld,
  TableColumnsStateOld,
  UseTableColumnsOld,
  DataTableViewStateOld,
  TableViewOld,
  UseSavedViewsOld,
  UseSavedViewsOldOptions,
  UseInfiniteScrollOld,
  UseInfiniteScrollOldOptions,
} from './TableOld';

// Table — the merged console Users table (7 September 2026): the card, its
// frozen row-number, Name and Action columns, headings that sort, move, resize
// and carry a menu, a select-all scope, the bulk bar, the pager and the
// "Load more" footer, the blank states, and DataTable, which assembles them
// with the Toolbar strip. Every pill inside is Badge.
export {
  Table,
  TableViewport,
  TableColGroup,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableSelectionCell,
  TableNumberCell,
  TableNumberHead,
  TableSelectAll,
  TableTailCell,
  tableCellVariants,
  tableHeadVariants,
  tableRowVariants,
  TABLE_GUTTER,
  TABLE_COLUMN_WIDTH,
  TABLE_COLUMN_MIN,
  TABLE_COLUMN_MAX,
  TableBulkBar,
  TableBulkAction,
  TableBulkSeparator,
  TablePager,
  TableLoadMore,
  TableBlank,
  TableSkeleton,
  TableScopeMenu,
  TableColumnsPanel,
  TableInsertPanel,
  PersonCell,
  ContactChips,
  TagList,
  TableEmptyValue,
  DataTable,
  useTableColumns,
  useTableSelection,
  useTableSort,
  useTablePaging,
  useColumnDrag,
} from './Table';
export type {
  TableSortDirection,
  TableSortState,
  TableAlign,
  TableColumnDef,
  TableColumnsLayout,
  TableSelectionScope,
  TablePagingMode,
  TableBlankKind,
  TableProps,
  TableViewportProps,
  TableColGroupProps,
  TableRowProps,
  TableCellProps,
  TableHeadProps,
  TableSelectionCellProps,
  TableNumberCellProps,
  TableNumberHeadProps,
  TableSelectAllProps,
  TableScopeMenuProps,
  TableBulkBarProps,
  TableBulkActionProps,
  TablePagerProps,
  TableLoadMoreProps,
  TableBlankProps,
  TableSkeletonProps,
  TableColumnsPanelProps,
  TableColumnsPanelColumn,
  TableInsertPanelProps,
  PersonCellProps,
  ContactChipsProps,
  TagListProps,
  DataTableProps,
  DataTableQuickFilter,
  DataTableFilterGroup,
  DataTableBlankCopy,
  DataTableNameColumn,
  UseTableColumns,
  UseTableColumnsOptions,
  UseTableSelection,
  UseTableSort,
  UseTablePaging,
  UseTablePagingOptions,
  UseColumnDrag,
  UseColumnDragOptions,
  ColumnDragState,
} from './Table';

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsVariant,
} from './Tabs';

// TagPill — a label a person put there and can take away. Badge is the other
// half of the pair: a label the system applies, which nobody removes.
export { TagPill, tagPillVariants } from './TagPill';
export type {
  TagPillProps,
  TagPillOwnProps,
  TagPillVariants,
  TagPillShape,
  TagPillEmphasis,
} from './TagPill';

// TagPillOld — the previous tag (24px, 10px inset, 4px square corner, no outline).
// DEPRECATED 2026-09-04: use TagPill.
export { TagPillOld, tagPillOldVariants } from './TagPillOld';
export type {
  TagPillOldProps,
  TagPillOldOwnProps,
  TagPillOldVariants,
  TagPillOldShape,
} from './TagPillOld';

// Textarea
export { Textarea, textareaVariants } from './Textarea';
export type { TextareaProps, TextareaVariants } from './Textarea';

// Toast
export { Toast, toast } from './Toast';
export type {
  ToastProps,
  ToastPosition,
  ToastTheme,
  ToastType,
  ToasterProps,
  ToastFunction,
  PromiseToastOptions,
} from './Toast';

// Toggle
export { Toggle, toggleVariants } from './Toggle';
export type { ToggleProps, ToggleVariants } from './Toggle';

// ToggleGroup
export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupVariants,
  toggleGroupItemVariants,
} from './ToggleGroup';
export type {
  ToggleGroupProps,
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
  ToggleGroupItemProps,
  ToggleGroupVariants,
  ToggleGroupItemVariants,
} from './ToggleGroup';

// Toolbar — the strip, its sections, and ToolbarButton: the 32px control with the
// four states (rest, hover, open, active with a count or a dot). Toolbar IS the
// console's 60px list-page strip; the old general strip is ToolbarOld. Ported 2026-09-04.
export {
  Toolbar,
  ToolbarSection,
  ToolbarSpacer,
  ToolbarButton,
  toolbarVariants,
  toolbarButtonVariants,
} from './Toolbar';
export type {
  ToolbarProps,
  ToolbarVariants,
  ToolbarButtonProps,
  ToolbarButtonOwnProps,
  ToolbarButtonVariants,
} from './Toolbar';

// ToolbarOld — the previous general-purpose strip (compact, spacious, padding
// switches). DEPRECATED 2026-09-04: use Toolbar.
export { ToolbarOld, ToolbarOldSection, ToolbarOldSpacer, toolbarOldVariants } from './ToolbarOld';
export type { ToolbarOldProps, ToolbarOldVariants } from './ToolbarOld';

// Tooltip — the merged console bubble on the library engine (2026-09-07)
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';
export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipContentRef,
  TooltipProviderProps,
} from './Tooltip';

// TooltipOld — the previous Tooltip, DEPRECATED 2026-09-07, kept for side-by-side review until 1.0.0
export { TooltipOld, TooltipTriggerOld, TooltipContentOld, TooltipProviderOld } from './TooltipOld';
export type {
  TooltipOldProps,
  TooltipTriggerOldProps,
  TooltipContentOldProps,
  TooltipContentOldRef,
  TooltipProviderOldProps,
} from './TooltipOld';

// Upload
export {
  Upload,
  UploadFileRow,
  uploadVariants,
  formatFileSize,
  useUploadFiles,
  validateSelection,
  matchesAccept,
  describeAccept,
} from './Upload';
export type {
  UploadProps,
  UploadOwnProps,
  UploadFileRowProps,
  UploadFileRowOwnProps,
  UploadItem,
  UploadKind,
  UploadStatus,
  UploadFailure,
  UploadRejection,
  UploadRejectionReason,
  UploadSender,
  UploadSenderContext,
  UploadVariantsType,
} from './Upload';

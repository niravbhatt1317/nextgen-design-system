import { cva } from 'class-variance-authority';
import { forwardRef, useState, useCallback } from 'react';
import { cn } from '@/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../DropdownMenu';
import { Icon } from '../Icon';
import type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarSectionProps,
  SidebarItemProps,
  SidebarLabelProps,
  SidebarSearchProps,
  SidebarCollapseProps,
  SidebarFooterProps,
  SidebarConfig,
  SidebarItemConfig,
  SidebarSectionConfig,
} from './Sidebar.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
const FLEX_ITEMS_CENTER_GAP = 'mdt-flex mdt-items-center mdt-gap-2';
const HOVER_BG_MUTED_TEXT = 'hover:mdt-bg-muted hover:mdt-text-foreground';

/**
 * Sidebar variants using Class Variance Authority (CVA)
 */
export const sidebarVariants = cva(
  [
    'mdt-flex mdt-flex-col',
    'mdt-h-screen',
    'mdt-bg-background',
    'mdt-border-r mdt-border-border',
    'mdt-overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: 'mdt-w-60',
        compact: 'mdt-w-16',
        wide: 'mdt-w-80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * @deprecated Use `LeftNav` instead. See COMPONENT-GAP.md.
 *
 * The navigation this library ships is `LeftNav`. This one predates it and
 * speaks a different visual language - a `muted` fill for the selected row with
 * no leading indicator, 20px icons, rows that size to their content rather than
 * to a fixed rhythm, and no sunken panel behind any of it. Neither is broken;
 * they are from different moments, and shipping both means products get two
 * navigations that do not read as siblings.
 *
 * It stays for now because `LeftNav` does not yet do two things this does:
 * collapse to a rail of icons, and render itself from a configuration object.
 * The second is being built; the first is logged and not scheduled.
 *
 * Do not build on it. When the app-navigation arrangement of `LeftNav` lands,
 * this goes.
 *
 * Sidebar component for navigation and content organization.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarHeader>IT Operations...</SidebarHeader>
 *   <SidebarSearch placeholder="Search..." />
 *   <SidebarContent>
 *     <SidebarSection>
 *       <SidebarItem icon={<Icon />}>Dashboard</SidebarItem>
 *     </SidebarSection>
 *   </SidebarContent>
 *   <SidebarFooter>Customize sidebar</SidebarFooter>
 * </Sidebar>
 * ```
 */
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(sidebarVariants({ variant }), className)} {...props}>
        {children}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

/**
 * SidebarHeader component for the top section of the sidebar.
 */
const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  (
    { className, icon, children, popoverContent, open, onOpenChange, showBorder = true, ...props },
    ref
  ) => {
    const headerContent = (
      <>
        {icon && (
          <div className="mdt-flex mdt-h-8 mdt-w-8 mdt-flex-shrink-0 mdt-items-center mdt-justify-center mdt-rounded mdt-bg-primary mdt-text-primary-foreground">
            {icon}
          </div>
        )}
        <span className="mdt-flex-1 mdt-truncate mdt-text-sm mdt-font-medium mdt-text-foreground">
          {children}
        </span>
      </>
    );

    if (popoverContent) {
      return (
        <div
          ref={ref}
          className={cn(
            FLEX_ITEMS_CENTER_GAP,
            'mdt-px-4 mdt-py-3',
            showBorder && 'mdt-border-b mdt-border-border',
            className
          )}
          {...props}
        >
          {headerContent}
          <DropdownMenu
            {...(open !== undefined && { open })}
            {...(onOpenChange && { onOpenChange })}
          >
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="mdt-flex mdt-h-6 mdt-w-6 mdt-items-center mdt-justify-center mdt-rounded mdt-text-muted-foreground mdt-transition-colors hover:mdt-bg-muted hover:mdt-text-foreground"
                aria-label="Switch project"
              >
                <Icon name="chevron-down" size="sm" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="mdt-w-56">
              {popoverContent}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          FLEX_ITEMS_CENTER_GAP,
          'mdt-px-4 mdt-py-3',
          showBorder && 'mdt-border-b mdt-border-border',
          className
        )}
        {...props}
      >
        {headerContent}
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

/**
 * SidebarSearch component for search functionality.
 */
const SidebarSearch = forwardRef<HTMLInputElement, SidebarSearchProps>(
  (
    { className, placeholder = 'Search...', shortcut = '⌘K', onSearch, onChange, ...props },
    ref
  ) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onSearch?.(e.target.value);
      },
      [onChange, onSearch]
    );

    return (
      <div className={cn('mdt-px-3 mdt-py-2', className)}>
        <div className="mdt-relative">
          <Icon
            name="search"
            size="sm"
            className="mdt-absolute mdt-left-3 mdt-top-1/2 mdt--translate-y-1/2 mdt-text-muted-foreground"
            aria-hidden
          />
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            className={cn(
              'mdt-w-full mdt-rounded-md mdt-border mdt-border-border',
              'mdt-bg-background mdt-py-1.5 mdt-pl-9 mdt-pr-12',
              'mdt-text-sm mdt-text-foreground mdt-placeholder-muted-foreground',
              'focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring focus:mdt-ring-offset-0',
              'hover:mdt-bg-muted/50'
            )}
            onChange={handleChange}
            {...props}
          />
          {shortcut && (
            <kbd className="mdt-absolute mdt-right-2 mdt-top-1/2 mdt--translate-y-1/2 mdt-rounded mdt-border mdt-border-border mdt-bg-muted mdt-px-1.5 mdt-py-0.5 mdt-text-[10px] mdt-font-medium mdt-text-muted-foreground">
              {shortcut}
            </kbd>
          )}
        </div>
      </div>
    );
  }
);

SidebarSearch.displayName = 'SidebarSearch';

/**
 * SidebarContent component for scrollable sidebar content.
 */
const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mdt-flex-1 mdt-overflow-y-auto mdt-px-2 mdt-py-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = 'SidebarContent';

/**
 * SidebarSection component for grouping sidebar items.
 */
const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mdt-mb-4', className)} {...props}>
        {children}
      </div>
    );
  }
);

SidebarSection.displayName = 'SidebarSection';

/**
 * SidebarLabel component for section labels.
 */
const SidebarLabel = forwardRef<HTMLDivElement, SidebarLabelProps>(
  ({ className, children, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mdt-mb-1 mdt-flex mdt-items-center mdt-justify-between mdt-px-2 mdt-py-1',
          'mdt-text-xs mdt-font-medium mdt-text-muted-foreground',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {action && <div className="mdt-flex mdt-items-center mdt-gap-1">{action}</div>}
      </div>
    );
  }
);

SidebarLabel.displayName = 'SidebarLabel';

/**
 * SidebarCollapse component for expandable/collapsible sections.
 */
const SidebarCollapse = forwardRef<HTMLDivElement, SidebarCollapseProps>(
  ({ className, title, defaultOpen = false, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div ref={ref} className={cn('mdt-mb-2', className)} {...props}>
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={cn(
            'mdt-flex mdt-w-full mdt-items-center mdt-justify-between',
            'mdt-rounded-md mdt-px-2 mdt-py-1.5',
            'mdt-text-xs mdt-font-medium mdt-text-muted-foreground',
            HOVER_BG_MUTED_TEXT,
            'mdt-transition-colors'
          )}
        >
          <span>{title}</span>
          <Icon
            name="chevron-right"
            size="xs"
            className={cn('mdt-transition-transform', isOpen ? 'mdt-rotate-90' : '')}
            aria-hidden
          />
        </button>
        {isOpen && <div className="mdt-mt-1 mdt-space-y-0.5">{children}</div>}
      </div>
    );
  }
);

SidebarCollapse.displayName = 'SidebarCollapse';

/**
 * SidebarItem component for individual navigation items.
 */
const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  (
    { className, active, icon, children, action, nested = false, variant = 'default', ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'mdt-group mdt-flex mdt-w-full mdt-items-center mdt-gap-2',
          'mdt-rounded-md mdt-px-2 mdt-py-1.5',
          'mdt-text-left mdt-text-sm',
          'mdt-transition-colors',
          nested && 'mdt-ml-2 mdt-pl-6',
          variant === 'default' && [
            'mdt-font-normal',
            'hover:mdt-bg-muted',
            active
              ? 'mdt-bg-muted mdt-text-foreground'
              : 'mdt-text-muted-foreground hover:mdt-text-foreground',
          ],
          variant === 'more' && ['mdt-font-normal mdt-text-muted-foreground', HOVER_BG_MUTED_TEXT],
          className
        )}
        type="button"
        {...props}
      >
        {icon && (
          <span className="mdt-flex mdt-h-5 mdt-w-5 mdt-flex-shrink-0 mdt-items-center mdt-justify-center">
            {icon}
          </span>
        )}
        <span className="mdt-flex-1 mdt-truncate">{children}</span>
        {action && (
          <span className="mdt-flex mdt-items-center mdt-gap-1 mdt-opacity-0 group-hover:mdt-opacity-100">
            {action}
          </span>
        )}
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

/**
 * SidebarFooter component for the bottom section of the sidebar.
 */
const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, icon, children, showBorder = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          FLEX_ITEMS_CENTER_GAP,
          showBorder && 'mdt-border-t mdt-border-border',
          'mdt-px-3 mdt-py-3',
          'mdt-text-sm mdt-font-medium mdt-text-muted-foreground',
          HOVER_BG_MUTED_TEXT,
          'mdt-cursor-pointer mdt-transition-colors',
          className
        )}
        {...props}
      >
        {icon && <span className="mdt-flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </div>
    );
  }
);

SidebarFooter.displayName = 'SidebarFooter';

/**
 * Data-driven Sidebar component that renders from configuration
 */
interface DataDrivenSidebarProps extends Omit<SidebarProps, 'children'> {
  /**
   * Sidebar configuration object
   */
  config: SidebarConfig;
}

const DataDrivenSidebar = forwardRef<HTMLDivElement, DataDrivenSidebarProps>(
  ({ config, ...props }, ref) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const toggleSection = useCallback((sectionId: string, hasMore: boolean) => {
      if (hasMore) {
        setExpandedSections((prev) => ({
          ...prev,
          [sectionId]: !prev[sectionId],
        }));
      }
    }, []);

    const renderItem = useCallback((item: SidebarItemConfig, nested = false) => {
      const actionButtons = item.actions?.map((action) => (
        <button
          key={action.label}
          type="button"
          className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
          aria-label={action.label}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick();
          }}
        >
          {action.icon}
        </button>
      ));

      return (
        <div key={item.id}>
          <SidebarItem
            icon={item.icon}
            {...(item.active !== undefined && { active: item.active })}
            nested={nested}
            {...(item.onClick && { onClick: item.onClick })}
            action={actionButtons && actionButtons.length > 0 ? <>{actionButtons}</> : undefined}
          >
            {item.label}
          </SidebarItem>
          {item.children?.map((child) => renderItem(child, true))}
        </div>
      );
    }, []);

    const renderSection = useCallback(
      (section: SidebarSectionConfig) => {
        const isExpanded = expandedSections[section.id] ?? false;
        const hasMaxItems = section.maxVisibleItems !== undefined && section.maxVisibleItems > 0;
        const visibleItems =
          hasMaxItems && !isExpanded
            ? section.items.slice(0, section.maxVisibleItems)
            : section.items;
        const hasMore = hasMaxItems && section.items.length > (section.maxVisibleItems ?? 0);
        const hiddenCount = hasMore ? section.items.length - (section.maxVisibleItems ?? 0) : 0;

        const sectionActions = section.actions?.map((action) => (
          <button
            key={action.label}
            type="button"
            className="mdt-rounded mdt-p-0.5 hover:mdt-bg-muted"
            aria-label={action.label}
            onClick={action.onClick}
          >
            {action.icon}
          </button>
        ));

        const content = (
          <>
            {visibleItems.map((item) => renderItem(item))}
            {hasMore && !isExpanded && (
              <SidebarItem
                variant="more"
                icon={section.moreButton?.icon ?? <Icon name="arrow-right" size="sm" aria-hidden />}
                onClick={() => {
                  toggleSection(section.id, hasMore);
                  section.moreButton?.onClick?.();
                }}
              >
                {section.moreButton?.label ?? `${String(hiddenCount)} more`}
              </SidebarItem>
            )}
          </>
        );

        if (section.collapsible) {
          return (
            <SidebarCollapse
              key={section.id}
              title={section.label ?? ''}
              {...(section.defaultOpen !== undefined && { defaultOpen: section.defaultOpen })}
            >
              {content}
            </SidebarCollapse>
          );
        }

        return (
          <SidebarSection key={section.id}>
            {section.label && (
              <SidebarLabel
                action={
                  sectionActions && sectionActions.length > 0 ? <>{sectionActions}</> : undefined
                }
              >
                {section.label}
              </SidebarLabel>
            )}
            {content}
          </SidebarSection>
        );
      },
      [expandedSections, renderItem, toggleSection]
    );

    return (
      <Sidebar ref={ref} {...props}>
        {/* Header */}
        {config.header && (
          <SidebarHeader
            icon={config.header.icon}
            {...(config.header.showBorder !== undefined && {
              showBorder: config.header.showBorder,
            })}
            popoverContent={
              config.header.projects && config.header.projects.length > 0 ? (
                <>
                  {config.header.projects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      className="mdt-flex mdt-w-full mdt-cursor-pointer mdt-items-center mdt-gap-2 mdt-rounded mdt-border-0 mdt-bg-transparent mdt-px-2 mdt-py-1.5 mdt-text-left hover:mdt-bg-muted"
                      onClick={project.onClick}
                    >
                      {project.icon && (
                        <div className="mdt-flex mdt-h-6 mdt-w-6 mdt-items-center mdt-justify-center mdt-rounded mdt-bg-primary mdt-text-xs mdt-text-primary-foreground">
                          {project.icon}
                        </div>
                      )}
                      <span>{project.name}</span>
                    </button>
                  ))}
                </>
              ) : undefined
            }
          >
            {config.header.title}
          </SidebarHeader>
        )}

        {/* Search */}
        {config.search && (
          <SidebarSearch
            {...(config.search.placeholder && { placeholder: config.search.placeholder })}
            {...(config.search.shortcut && { shortcut: config.search.shortcut })}
            {...(config.search.onSearch && { onSearch: config.search.onSearch })}
          />
        )}

        {/* Content */}
        <SidebarContent>{config.sections.map((section) => renderSection(section))}</SidebarContent>

        {/* Footer */}
        {config.footer && (
          <SidebarFooter
            icon={config.footer.icon}
            {...(config.footer.showBorder !== undefined && {
              showBorder: config.footer.showBorder,
            })}
            {...(config.footer.onClick && { onClick: config.footer.onClick })}
          >
            {config.footer.label}
          </SidebarFooter>
        )}
      </Sidebar>
    );
  }
);

DataDrivenSidebar.displayName = 'DataDrivenSidebar';

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
  DataDrivenSidebar,
};

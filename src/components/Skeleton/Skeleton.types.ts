import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { skeletonVariants as SkeletonVariantsCVA } from './Skeleton';

/**
 * Skeleton variants from CVA
 */
export type SkeletonVariants = VariantProps<typeof SkeletonVariantsCVA>;

/**
 * Props for the Skeleton component
 */
export interface SkeletonProps extends ComponentPropsWithoutRef<'div'>, SkeletonVariants {}

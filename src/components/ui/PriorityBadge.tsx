
import React from 'react';
import { cn } from "@/lib/utils";

type Priority = 'high' | 'medium' | 'low';
type RuleCriteria = 'SKU' | 'Keyword' | 'Categoría' | 'KeyCat';

interface PriorityBadgeProps {
  priority: Priority;
  criteria: RuleCriteria;
  className?: string;
}

// Map criteria types to priority levels
const criteriaToPriority: Record<RuleCriteria, Priority> = {
  'SKU': 'high',
  'Keyword': 'medium',
  'Categoría': 'low',
  'KeyCat': 'medium',
};

// Map priority levels to colors and styles
const priorityStyles: Record<Priority, string> = {
  'high': 'priority-high',
  'medium': 'priority-medium',
  'low': 'priority-low',
};

const PriorityBadge = ({ priority, criteria, className }: PriorityBadgeProps) => {
  const actualPriority = priority || criteriaToPriority[criteria];
  
  return (
    <span className={cn("priority-badge", priorityStyles[actualPriority], className)}>
      {criteria}
      {criteria === 'SKU' && <span className="ml-1">🔴</span>}
      {criteria === 'Keyword' && <span className="ml-1">🟡</span>}
      {criteria === 'Categoría' && <span className="ml-1">🔵</span>}
      {criteria === 'KeyCat' && <span className="ml-1">🟡</span>}
    </span>
  );
};

export default PriorityBadge;

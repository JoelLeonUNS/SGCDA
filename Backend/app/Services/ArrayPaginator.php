<?php

namespace App\Services;

class ArrayPaginator
{
    protected function paginateArray(array $data, int $pageIndex, int $pageSize): array
    {
        return array_slice($data, ($pageIndex - 1) * $pageSize, $pageSize);
    }

    protected function sortArray(array &$data, string $sortField, string $sortOrder): void
    {
        usort($data, function ($a, $b) use ($sortField, $sortOrder) {
            if ($sortOrder === 'asc') {
                return $a[$sortField] <=> $b[$sortField];
            } else {
                return $b[$sortField] <=> $a[$sortField];
            }
        });
    }

    protected function filterArray(array $data, array $filters): array
    {
        return array_filter($data, function ($item) use ($filters) {
            foreach ($filters as $field => $value) {
                if ($item[$field] !== $value) {
                    return false;
                }
            }
            return true;
        });
    }

    protected function searchArray(array $data, string $searchTerm, string $searchColumn): array
    {
        return array_filter($data, function ($item) use ($searchTerm, $searchColumn) {
            return str_contains(strtolower($item[$searchColumn]), strtolower($searchTerm));
        });
    }

    protected function applyCriteria(array $data, array $criteria): array
    {
        if ($criteria['filters']) {
            $data = $this->filterArray($data, $criteria['filters']);
        }

        if ($criteria['searchTerm'] ?? null && $criteria['searchColumn'] ?? null) {
            $data = $this->searchArray($data, $criteria['searchTerm'] ?? null, $criteria['searchColumn'] ?? null);
        }

        if ($criteria['sortField'] && $criteria['sortOrder']) {
            $this->sortArray($data, $criteria['sortField'], $criteria['sortOrder']);
        }

        return $this->paginateArray($data, $criteria['pageIndex'] ?? 1, $criteria['pageSize'] ?? 10);
    }
}

<?php

namespace App\Http\Enums;

enum Estados: string
{
    case ACTIVO = 'ACTIVO';
    case INACTIVO = 'INACTIVO';
    case ABIERTO = 'ABIERTO';
    case CERRADO = 'CERRADO';

    public static function fromValue(string $value): ?self
    {
        foreach (self::cases() as $case) {
            if ($case->value === strtoupper($value)) {
                return $case;
            }
        }
        return null;
    }

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
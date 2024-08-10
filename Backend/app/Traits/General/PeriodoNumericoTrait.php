<?php

namespace App\Traits\General;

trait PeriodoNumericoTrait
{
    /**
     * Convierte un periodo (año - correlativo romano) a un periodo numérico.
     * 
     * @param string $periodo
     * @return int
     */
    public function periodoToNumerico(string $periodo): int
    {
        // Eliminar espacios en blanco y convertir a mayúsculas
        $periodo = strtoupper(trim($periodo));
        
        // Separar el año y el correlativo romano
        $partes = explode('-', $periodo);

        // Asegurarse de que el año tenga al menos dos dígitos
        $anio = isset($partes[0]) ? str_pad($partes[0], 4, '0', STR_PAD_LEFT) : '0000';

        // Correlativo romano (puede estar ausente o ser inválido)
        $correlativoRomano = isset($partes[1]) ? trim($partes[1]) : '';

        // Convertir el correlativo romano a número
        $numRomano = $this->romanoANumero($correlativoRomano);

        // Si solo hay año o no hay correlativo romano válido, solo devolver el año
        if ($numRomano == 0) {
            return intval($anio);
        }

        // Concatenar el año y el número romano convertido
        return intval($anio . $numRomano);
    }

    /**
     * Convierte un año y un correlativo romano a un periodo numérico.
     *
     * @param int $anio
     * @param string $correlativoRomano
     * @return int
     */
    public function toPeriodoNumerico($anio, $correlativoRomano): int
    {
        $numRomano = $this->romanoANumero($correlativoRomano);
        return intval($anio . $numRomano);
    }

    /**
     * Convierte un periodo numérico a año y correlativo romano.
     *
     * @param int $periodoNumerico
     * @return array
     */
    public function fromPeriodoNumerico($periodoNumerico)
    {
        $anio = intval($periodoNumerico / 10);
        $numRomano = $periodoNumerico % 10;
        return [
            'anio' => $anio,
            'correlativo_romano' => $this->numeroARomano($numRomano)
        ];
    }

    /**
     * Convierte un número romano a su equivalente numérico.
     *
     * @param string $romano
     * @return int
     */
    protected function romanoANumero($romano)
    {
        $romanos = [
            'I' => 1,
            'II' => 2,
            'III' => 3,
            'IV' => 4,
            'V' => 5,
            'VI' => 6,
            'VII' => 7,
            'VIII' => 8,
            'IX' => 9,
            'X' => 10
        ];
        return $romanos[$romano] ?? 0;
    }

    /**
     * Convierte un número a su equivalente romano.
     *
     * @param int $numero
     * @return string
     */
    protected function numeroARomano($numero)
    {
        $romanos = [
            1 => 'I',
            2 => 'II',
            3 => 'III',
            4 => 'IV',
            5 => 'V',
            6 => 'VI',
            7 => 'VII',
            8 => 'VIII',
            9 => 'IX',
            10 => 'X'
        ];
        return $romanos[$numero] ?? '';
    }
}

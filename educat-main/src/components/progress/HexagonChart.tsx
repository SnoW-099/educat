import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProgressData {
  grammar_score: number;
  vocabulary_score: number;
  listening_score: number;
  speaking_score: number;
  reading_score: number;
  writing_score: number;
  overall_score: number;
}

interface HexagonChartProps {
  data: ProgressData;
  currentLevel: string;
  targetLevel: string;
  className?: string;
}

export const HexagonChart = ({ data, currentLevel, targetLevel, className = '' }: HexagonChartProps) => {
  const skills = useMemo(() => [
    { key: 'grammar_score', label: 'Gramàtica', value: data.grammar_score, color: '#3B82F6' },
    { key: 'vocabulary_score', label: 'Vocabulari', value: data.vocabulary_score, color: '#10B981' },
    { key: 'listening_score', label: 'Comprensió oral', value: data.listening_score, color: '#F59E0B' },
    { key: 'speaking_score', label: 'Expressió oral', value: data.speaking_score, color: '#EF4444' },
    { key: 'reading_score', label: 'Comprensió escrita', value: data.reading_score, color: '#8B5CF6' },
    { key: 'writing_score', label: 'Expressió escrita', value: data.writing_score, color: '#F97316' },
  ], [data]);

  const maxValue = 100;
  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  // Calculate hexagon points
  const getHexagonPoints = (scale: number = 1) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2; // Start from top
      const x = centerX + Math.cos(angle) * radius * scale;
      const y = centerY + Math.sin(angle) * radius * scale;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Calculate data points for the progress polygon
  const getDataPoints = () => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const skill = skills[i];
      const scale = skill.value / maxValue;
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius * scale;
      const y = centerY + Math.sin(angle) * radius * scale;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Calculate skill level points for labels
  const getSkillLabelPosition = (index: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const labelRadius = radius + 25;
    const x = centerX + Math.cos(angle) * labelRadius;
    const y = centerY + Math.sin(angle) * labelRadius;
    return { x, y };
  };

  // Get level color
  const getLevelColor = (level: string) => {
    const colors = {
      'A1': '#10B981', // Green
      'A2': '#3B82F6', // Blue  
      'B1': '#F59E0B', // Yellow
      'B2': '#F97316', // Orange
      'C1': '#EF4444', // Red
      'C2': '#8B5CF6'  // Purple
    };
    return colors[level as keyof typeof colors] || '#6B7280';
  };

  // Calculate strengths and weaknesses
  const strengths = skills.filter(skill => skill.value >= 75).map(skill => skill.label);
  const weaknesses = skills.filter(skill => skill.value < 50).map(skill => skill.label);

  return (
    <Card className={`${className} shadow-card`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Anàlisi de Competències</span>
          <div className="flex space-x-2">
            <Badge style={{ backgroundColor: getLevelColor(currentLevel) }}>
              Actual: {currentLevel}
            </Badge>
            <Badge variant="outline" style={{ borderColor: getLevelColor(targetLevel), color: getLevelColor(targetLevel) }}>
              Objectiu: {targetLevel}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Hexagon Chart */}
        <div className="flex justify-center">
          <svg width="300" height="300" viewBox="0 0 300 300">
            {/* Background grid lines */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
              <polygon
                key={index}
                points={getHexagonPoints(scale)}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity={0.3}
              />
            ))}

            {/* Axis lines */}
            {skills.map((_, index) => {
              const angle = (Math.PI / 3) * index - Math.PI / 2;
              const endX = centerX + Math.cos(angle) * radius;
              const endY = centerY + Math.sin(angle) * radius;
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity={0.3}
                />
              );
            })}

            {/* Data polygon */}
            <polygon
              points={getDataPoints()}
              fill="hsl(var(--accent) / 0.2)"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
            />

            {/* Data points */}
            {skills.map((skill, index) => {
              const scale = skill.value / maxValue;
              const angle = (Math.PI / 3) * index - Math.PI / 2;
              const x = centerX + Math.cos(angle) * radius * scale;
              const y = centerY + Math.sin(angle) * radius * scale;
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={skill.color}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}

            {/* Skill labels */}
            {skills.map((skill, index) => {
              const pos = getSkillLabelPosition(index);
              return (
                <g key={index}>
                  <text
                    x={pos.x}
                    y={pos.y - 5}
                    textAnchor="middle"
                    className="fill-foreground text-xs font-medium"
                  >
                    {skill.label}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 10}
                    textAnchor="middle"
                    className="fill-muted-foreground text-xs"
                  >
                    {skill.value}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Overall Score */}
        <div className="text-center">
          <div className="text-3xl font-bold text-accent mb-2">
            {Math.round(data.overall_score)}%
          </div>
          <p className="text-muted-foreground">Puntuació general</p>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-success mb-2">Fortaleses</h4>
            {strengths.length > 0 ? (
              <div className="space-y-1">
                {strengths.map(strength => (
                  <Badge key={strength} variant="secondary" className="mr-1 mb-1">
                    {strength}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Continua practicant per desenvolupar les teves fortaleses
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-warning mb-2">Àrees de millora</h4>
            {weaknesses.length > 0 ? (
              <div className="space-y-1">
                {weaknesses.map(weakness => (
                  <Badge key={weakness} variant="outline" className="mr-1 mb-1">
                    {weakness}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Excel·lent! Totes les àrees estan per sobre del 50%
              </p>
            )}
          </div>
        </div>

        {/* Progress to target level */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progrés cap a {targetLevel}</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(data.overall_score)}% / 85%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((data.overall_score / 85) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Necessites un 85% per assolir el nivell {targetLevel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
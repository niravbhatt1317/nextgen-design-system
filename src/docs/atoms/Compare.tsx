import { Specimen, isEmptyCanvas } from './Specimen';
import data from './atoms-data.json';

type SystemKey = 'om' | 'iam' | 'afm' | 'cp';

interface AtomRow {
  id: string;
  type: string;
  category: string;
  note: string;
  specimens: Partial<Record<SystemKey, { id: string; title: string; html: string }[]>>;
}

const rows = data.rows as AtomRow[];
const systems = data.systems as { key: SystemKey; label: string; color: string }[];

/**
 * Side-by-side comparison of one atom across the four product design systems.
 *
 * This is a decision surface, not documentation: pick the version to carry into
 * the design system, then that becomes the atom.
 */
export const Compare = ({ atomId }: { atomId: string }) => {
  const row = rows.find((r) => r.id === atomId);

  if (!row) {
    return <p style={{ color: 'crimson' }}>No atom row called &quot;{atomId}&quot;.</p>;
  }

  const built = systems.filter((s) => (row.specimens[s.key] ?? []).length > 0);

  return (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <header className="mdt-flex mdt-flex-col mdt-gap-2">
        <div className="mdt-flex mdt-items-center mdt-gap-3">
          <h2 className="mdt-text-xl mdt-font-semibold mdt-text-foreground">{row.type}</h2>
          <span className="mdt-rounded-sm mdt-bg-muted mdt-px-2 mdt-py-0.5 mdt-text-xs mdt-text-muted-foreground">
            {row.category}
          </span>
          <span className="mdt-text-xs mdt-text-muted-foreground">
            built by {built.length} of 4
          </span>
        </div>
        {row.note ? (
          <p className="mdt-max-w-3xl mdt-text-sm mdt-text-muted-foreground">{row.note}</p>
        ) : null}
      </header>

      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        {systems.map((sys) => {
          const specs = row.specimens[sys.key] ?? [];
          return (
            <section
              key={sys.key}
              className="mdt-rounded-md mdt-border mdt-border-border mdt-bg-card"
            >
              <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-border-b mdt-border-border mdt-px-4 mdt-py-2">
                <span
                  className="mdt-h-2 mdt-w-2 mdt-rounded-full"
                  style={{ background: sys.color }}
                  aria-hidden="true"
                />
                <span className="mdt-text-sm mdt-font-medium mdt-text-foreground">
                  {sys.label}
                </span>
                {specs.length === 0 ? (
                  <span className="mdt-text-xs mdt-text-muted-foreground">
                    &mdash; did not build this
                  </span>
                ) : null}
              </div>

              {specs.length > 0 ? (
                <div className="mdt-flex mdt-flex-col mdt-gap-4 mdt-bg-white mdt-p-4">
                  {specs.map((spec) => (
                    <div key={spec.id}>
                      {isEmptyCanvas(spec.html) ? (
                        <p
                          style={{
                            fontSize: 13,
                            color: '#8a6d1f',
                            background: '#fff8e1',
                            border: '1px solid #f0e0a8',
                            borderRadius: 6,
                            padding: '8px 10px',
                          }}
                        >
                          <b>{spec.title}</b> &mdash; this specimen is an empty container that the
                          original product page filled with JavaScript. It renders blank in the
                          merged library too, so there is nothing to compare here yet.
                        </p>
                      ) : (
                        <Specimen system={sys.key} html={spec.html} />
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export const atomRows = rows;
